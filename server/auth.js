import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import {
  getUserByEmail,
  getUserById,
  getUserByGoogleId,
  getUserByGithubId,
  createUser,
  updateUserSocialId,
  updateUserPassword,
  createOtp,
  getValidOtp,
  markOtpUsed,
  createPasswordReset,
  getValidPasswordReset,
  deletePasswordReset
} from './db.js';

const router = express.Router();

// Helper function to create nodemailer transporter
const getMailTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: parseInt(port),
    auth: { user, pass }
  });
};

// Helper function to send email with terminal fallback
const sendEmail = async ({ to, subject, html, text }) => {
  const transporter = getMailTransporter();
  const from = process.env.SMTP_FROM || '"Vericode AI" <noreply@vericode.ai>';

  if (transporter) {
    try {
      await transporter.sendMail({ from, to, subject, html, text });
      console.log(`[SMTP] Email sent successfully to ${to} (Subject: ${subject})`);
      return true;
    } catch (err) {
      console.error('[SMTP] Failed to send email via SMTP server:', err.message);
      // Fall through to terminal output
    }
  }

  // Fallback: print to console in a nice box
  console.log('\n' + '='.repeat(60));
  console.log(`✉️  [SIMULATED EMAIL SENT]`);
  console.log(`To:      ${to}`);
  console.log(`Subject: ${subject}`);
  console.log('-'.repeat(60));
  console.log(text || html.replace(/<[^>]*>/g, ''));
  console.log('='.repeat(60) + '\n');
  return true;
};

// 1. REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'A user with this email address already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await createUser({
      name,
      email,
      password: hashedPassword
    });

    // Send Welcome Email
    await sendEmail({
      to: email,
      subject: 'Welcome to Vericode AI!',
      text: `Hello ${name},\n\nWelcome to Vericode AI! Your account has been created successfully.\n\nYou can now log in using your email and password. Two-factor authentication is active on your account to keep your workspaces secure.\n\nBest regards,\nThe Vericode AI Team`,
      html: `<div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #000;">Welcome to Vericode AI!</h2>
        <p>Hello <strong>${name}</strong>,</p>
        <p>Your account has been created successfully.</p>
        <p>You can now log in using your email and password. Two-factor authentication (email OTP) is active on your account to keep your workspaces and LeetCode sandboxes secure.</p>
        <p style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #888;">
          Best regards,<br>The Vericode AI Team
        </p>
      </div>`
    });

    res.status(201).json({
      message: 'Registration successful! You can now log in.',
      user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error during registration' });
  }
});

// 2. LOGIN (Triggers 2FA OTP)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await getUserByEmail(email);
    if (!user || !user.password) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    await createOtp(email, code, expiresAt);

    // Send OTP email
    await sendEmail({
      to: email,
      subject: `Your Vericode AI Security Code: ${code}`,
      text: `Hello ${user.name},\n\nSomeone is trying to sign in to your Vericode AI account.\n\nYour 2FA verification code is: ${code}\n\nThis code will expire in 10 minutes.\n\nIf this wasn't you, please change your password immediately.\n\nBest regards,\nThe Vericode AI Team`,
      html: `<div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #000; text-align: center;">Vericode AI Security Verification</h2>
        <p>Hello <strong>${user.name}</strong>,</p>
        <p>Someone is trying to sign in to your Vericode AI account. Use the verification code below to complete the sign-in process:</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 6px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 6px; margin: 24px 0; border: 1px solid #ddd;">
          ${code}
        </div>
        <p>This code is valid for <strong>10 minutes</strong>. If you did not initiate this request, you should change your password immediately to secure your account.</p>
        <p style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #888;">
          Best regards,<br>The Vericode AI Team
        </p>
      </div>`
    });

    res.json({
      message: '2FA verification code sent to your email',
      require2fa: true,
      email: email.toLowerCase()
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

// 3. VERIFY 2FA & GET JWT
router.post('/verify-2fa', async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: 'Email and 2FA code are required' });
    }

    const otpRecord = await getValidOtp(email, code);
    if (!otpRecord) {
      return res.status(400).json({ error: 'Invalid or expired verification code' });
    }

    // Mark OTP as used
    await markOtpUsed(otpRecord.id);

    // Get user
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'User account not found' });
    }

    // Sign JWT
    const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key';
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      jwtSecret,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Verification successful',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('2FA verification error:', err);
    res.status(500).json({ error: 'Internal server error during verification' });
  }
});

// 4. FORGOT PASSWORD
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await getUserByEmail(email);
    // Security best practice: don't reveal if user exists or not, but only send reset link if they do.
    if (user) {
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry

      await createPasswordReset(email, token, expiresAt);

      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const resetLink = `${frontendUrl}/#/reset-password?token=${token}`;

      await sendEmail({
        to: email,
        subject: 'Reset your Vericode AI Password',
        text: `Hello ${user.name},\n\nYou requested to reset your password.\n\nPlease reset your password using the link below:\n${resetLink}\n\nThis link will expire in 1 hour.\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nThe Vericode AI Team`,
        html: `<div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #000;">Reset your Password</h2>
          <p>Hello <strong>${user.name}</strong>,</p>
          <p>You requested to reset your password. Click the button below to choose a new password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #000; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
          </div>
          <p>If the button above does not work, copy and paste this link in your browser:</p>
          <p style="word-break: break-all; color: #888;">${resetLink}</p>
          <p>This link is valid for <strong>1 hour</strong>. If you did not make this request, you can ignore this email and your password will remain unchanged.</p>
          <p style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #888;">
            Best regards,<br>The Vericode AI Team
          </p>
        </div>`
      });
    }

    res.json({
      message: 'If the email exists in our records, a password reset link has been sent.'
    });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Internal server error during password reset request' });
  }
});

// 5. RESET PASSWORD
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: 'Token and new password are required' });
    }

    const resetRecord = await getValidPasswordReset(token);
    if (!resetRecord) {
      return res.status(400).json({ error: 'Invalid or expired password reset token' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user password
    await updateUserPassword(resetRecord.email, hashedPassword);

    // Delete token
    await deletePasswordReset(token);

    res.json({ message: 'Password has been reset successfully. You can now log in.' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: 'Internal server error during password reset' });
  }
});

// 6. GET ACTIVE USER DETAILS (JWT Verification)
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: missing authorization header' });
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key';

    try {
      const decoded = jwt.verify(token, jwtSecret);
      const user = await getUserById(decoded.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        user: { id: user.id, name: user.name, email: user.email }
      });
    } catch (jwtErr) {
      return res.status(401).json({ error: 'Unauthorized: invalid or expired token' });
    }
  } catch (err) {
    console.error('Get active user error:', err);
    res.status(500).json({ error: 'Internal server error verifying token' });
  }
});

// ==========================================
// SOCIAL OAUTH CHANNELS (MANUAL FLOW)
// ==========================================

// Google Login Endpoint
router.get('/google', (req, res) => {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
  const redirectUri = `${backendUrl}/api/auth/google/callback`;

  // Fallback: If no credentials, redirect directly with a mock token to make testing painless
  if (!googleClientId) {
    console.warn('[OAUTH] Google Client ID is missing. Redirecting with a mock Google token.');
    const mockToken = jwt.sign(
      { id: 999, name: 'Mock Google User', email: 'google.mock@vericode.ai' },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '7d' }
    );
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    return res.redirect(`${frontendUrl}/#/oauth-callback?token=${mockToken}`);
  }

  const oauth2Url = `https://accounts.google.com/o/oauth2/v2/auth?` + 
    `client_id=${googleClientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code` +
    `&scope=email%20profile` +
    `&prompt=select_account`;

  res.redirect(oauth2Url);
});

// Google Callback Endpoint
router.get('/google/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    if (!code) {
      return res.redirect(`${frontendUrl}/#/login?error=Google authentication failed`);
    }

    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const redirectUri = `${backendUrl}/api/auth/google/callback`;

    // 1. Exchange code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: googleClientId,
        client_secret: googleClientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    });

    const tokenData = await tokenResponse.json();
    if (tokenData.error) {
      throw new Error(`Google token exchange error: ${tokenData.error_description || tokenData.error}`);
    }

    // 2. Fetch user profile data
    const userinfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });
    const profile = await userinfoResponse.json();

    if (!profile.email) {
      throw new Error('Google did not return an email address');
    }

    // 3. Find or Create User
    let user = await getUserByGoogleId(profile.id);

    if (!user) {
      // Check if user already exists with this email
      user = await getUserByEmail(profile.email);
      if (user) {
        // Link Google ID to existing user
        await updateUserSocialId(user.id, 'google_id', profile.id);
      } else {
        // Create new user (no password for pure social login)
        user = await createUser({
          name: profile.name || profile.given_name || 'Google User',
          email: profile.email,
          google_id: profile.id
        });
      }
    }

    // 4. Generate JWT & Redirect
    const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key';
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      jwtSecret,
      { expiresIn: '7d' }
    );

    res.redirect(`${frontendUrl}/#/oauth-callback?token=${token}`);
  } catch (err) {
    console.error('Google OAuth callback error:', err);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/#/login?error=Google OAuth exchange failed`);
  }
});

// GitHub Login Endpoint
router.get('/github', (req, res) => {
  const githubClientId = process.env.GITHUB_CLIENT_ID;

  // Fallback: If no credentials, redirect directly with a mock token to make testing painless
  if (!githubClientId) {
    console.warn('[OAUTH] GitHub Client ID is missing. Redirecting with a mock GitHub token.');
    const mockToken = jwt.sign(
      { id: 888, name: 'Mock GitHub User', email: 'github.mock@vericode.ai' },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '7d' }
    );
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    return res.redirect(`${frontendUrl}/#/oauth-callback?token=${mockToken}`);
  }

  const oauth2Url = `https://github.com/login/oauth/authorize?` +
    `client_id=${githubClientId}` +
    `&scope=user:email`;

  res.redirect(oauth2Url);
});

// GitHub Callback Endpoint
router.get('/github/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    if (!code) {
      return res.redirect(`${frontendUrl}/#/login?error=GitHub authentication failed`);
    }

    const githubClientId = process.env.GITHUB_CLIENT_ID;
    const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

    // 1. Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        client_id: githubClientId,
        client_secret: githubClientSecret,
        code
      })
    });

    const tokenData = await tokenResponse.json();
    if (tokenData.error) {
      throw new Error(`GitHub token exchange error: ${tokenData.error_description || tokenData.error}`);
    }

    // 2. Fetch user profile data
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${tokenData.access_token}`,
        'User-Agent': 'Vericode-AI-Auth'
      }
    });
    const profile = await userResponse.json();

    // 3. Fetch user email (often hidden if not public on github profile)
    let email = profile.email;
    if (!email) {
      const emailResponse = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `token ${tokenData.access_token}`,
          'User-Agent': 'Vericode-AI-Auth'
        }
      });
      const emails = await emailResponse.json();
      const primaryEmail = emails.find(e => e.primary);
      email = primaryEmail ? primaryEmail.email : null;
    }

    if (!email) {
      // Fallback in case email is not returned at all
      email = `${profile.login || 'github_user'}@github.com`;
    }

    // 4. Find or Create User
    let user = await getUserByGithubId(profile.id.toString());

    if (!user) {
      // Check if user already exists with this email
      user = await getUserByEmail(email);
      if (user) {
        // Link GitHub ID to existing user
        await updateUserSocialId(user.id, 'github_id', profile.id.toString());
      } else {
        // Create new user (no password for pure social login)
        user = await createUser({
          name: profile.name || profile.login || 'GitHub User',
          email,
          github_id: profile.id.toString()
        });
      }
    }

    // 5. Generate JWT & Redirect
    const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key';
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      jwtSecret,
      { expiresIn: '7d' }
    );

    res.redirect(`${frontendUrl}/#/oauth-callback?token=${token}`);
  } catch (err) {
    console.error('GitHub OAuth callback error:', err);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/#/login?error=GitHub OAuth exchange failed`);
  }
});

export default router;
