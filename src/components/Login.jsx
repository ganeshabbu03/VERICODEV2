import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [show2fa, setShow2fa] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function enableSmoothCaret(inputId, caretId) {
      const input = document.getElementById(inputId);
      const caret = document.getElementById(caretId);
      if (!input || !caret) return;

      const container = input.parentElement;
      const mirrorId = 'input-mirror-' + inputId;
      let mirrorDiv = document.getElementById(mirrorId);
      if (!mirrorDiv) {
        mirrorDiv = document.createElement('div');
        mirrorDiv.id = mirrorId;
        mirrorDiv.className = 'input-mirror-div';
        mirrorDiv.style.position = 'absolute';
        mirrorDiv.style.visibility = 'hidden';
        mirrorDiv.style.pointerEvents = 'none';
        container.appendChild(mirrorDiv);
      }

      function getCaretCoordinates(element, position) {
        const style = mirrorDiv.style;
        const computed = window.getComputedStyle(element);

        const properties = [
          'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'lineHeight',
          'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom',
          'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth',
          'borderStyle', 'boxSizing', 'textAlign', 'textTransform', 'letterSpacing', 'wordSpacing'
        ];
        properties.forEach(prop => {
          style[prop] = computed[prop];
        });

        style.whiteSpace = 'pre-wrap';
        style.wordWrap = 'break-word';
        style.width = element.clientWidth + 'px';
        style.height = element.clientHeight + 'px';
        style.left = element.offsetLeft + 'px';
        style.top = element.offsetTop + 'px';

        const value = element.value;
        const isPassword = element.type === 'password';
        const dotChar = navigator.userAgent.match(/firefox|fxios/i) ? '\u25CF' : '\u2022';
        const textBefore = isPassword ? dotChar.repeat(position) : value.substring(0, position);

        mirrorDiv.textContent = textBefore;

        const span = document.createElement('span');
        span.textContent = '|';
        mirrorDiv.appendChild(span);

        return {
          top: element.offsetTop + span.offsetTop - element.scrollTop,
          left: element.offsetLeft + span.offsetLeft - element.scrollLeft,
          height: span.offsetHeight
        };
      }

      let blinkTimeout = null;
      let rafId = null;
      function updateCaret() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          if (document.activeElement !== input) {
            caret.style.opacity = '0';
            return;
          }

          const pos = input.selectionStart;
          const coordinates = getCaretCoordinates(input, pos);

          caret.style.left = coordinates.left + 'px';
          caret.style.top = (coordinates.top + (coordinates.height - 16) / 2) + 'px';
          caret.style.height = '16px';
          caret.style.opacity = '1';

          caret.classList.remove('blink');
          clearTimeout(blinkTimeout);
          blinkTimeout = setTimeout(() => {
            if (document.activeElement === input) {
              caret.classList.add('blink');
            }
          }, 500);
        });
      }

      input.addEventListener('input', updateCaret);
      input.addEventListener('focus', updateCaret);
      input.addEventListener('blur', () => {
        caret.style.opacity = '0';
      });
      input.addEventListener('click', updateCaret);
      input.addEventListener('keyup', updateCaret);
      input.addEventListener('select', updateCaret);
      input.addEventListener('scroll', updateCaret);
      
      const onSelectionChange = () => {
        if (document.activeElement === input) {
          updateCaret();
        }
      };
      document.addEventListener('selectionchange', onSelectionChange);

      const onResize = () => {
        if (document.activeElement === input) {
          updateCaret();
        }
      };
      window.addEventListener('resize', onResize);

      // Return cleanup handler
      return () => {
        input.removeEventListener('input', updateCaret);
        input.removeEventListener('focus', updateCaret);
        input.removeEventListener('click', updateCaret);
        input.removeEventListener('keyup', updateCaret);
        input.removeEventListener('select', updateCaret);
        input.removeEventListener('scroll', updateCaret);
        document.removeEventListener('selectionchange', onSelectionChange);
        window.removeEventListener('resize', onResize);
        clearTimeout(blinkTimeout);
        if (rafId) cancelAnimationFrame(rafId);
        if (mirrorDiv.parentNode) {
          mirrorDiv.parentNode.removeChild(mirrorDiv);
        }
      };
    }

    const cleanEmail = enableSmoothCaret('email', 'email-caret');
    const cleanPassword = enableSmoothCaret('password', 'password-caret');
    const cleanOtp = enableSmoothCaret('otp', 'otp-caret');

    return () => {
      if (cleanEmail) cleanEmail();
      if (cleanPassword) cleanPassword();
      if (cleanOtp) cleanOtp();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      // If backend is unreachable, fall back to mock auth
      if (!response.ok && response.status === 0) {
        localStorage.setItem('token', 'mock_token_' + Date.now());
        localStorage.setItem('mock_user', JSON.stringify({ name: email.split('@')[0], email }));
        navigate('/dashboard');
        return;
      }

      const data = await response.json();
      if (response.ok) {
        if (data.require2fa) {
          setShow2fa(true);
          setSuccess(data.message || '2FA verification code sent to your email.');
        } else {
          localStorage.setItem('token', data.token);
          navigate('/dashboard');
        }
      } else {
        setError(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      // Network error — treat as offline mode
      localStorage.setItem('token', 'mock_token_' + Date.now());
      localStorage.setItem('mock_user', JSON.stringify({ name: email.split('@')[0], email }));
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify2FA = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otp })
      });

      // Offline fallback
      if (!response.ok && response.status === 0) {
        localStorage.setItem('token', 'mock_token_' + Date.now());
        localStorage.setItem('mock_user', JSON.stringify({ name: email.split('@')[0], email }));
        navigate('/dashboard');
        return;
      }

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setSuccess('Verification successful! Logging in...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setError(data.error || 'Invalid or expired verification code.');
      }
    } catch (err) {
      // Offline fallback
      localStorage.setItem('token', 'mock_token_' + Date.now());
      localStorage.setItem('mock_user', JSON.stringify({ name: email.split('@')[0], email }));
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-body-wrapper">
      <style>{`
        .login-page-body-wrapper {
          background-color: var(--color-black);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          width: 100%;
          box-sizing: border-box;
        }
        
        .login-container {
          width: 100%;
          max-width: 1024px;
          min-height: 600px;
          background-color: var(--color-white);
          border-radius: 16px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
        }
        
        .login-panel-info {
          background-color: var(--color-black);
          color: var(--color-white);
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        
        .login-panel-info::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(135deg, transparent 45%, rgba(255, 255, 255, 0.03) 50%, transparent 55%);
          pointer-events: none;
        }
        
        .login-info-header .logo-container {
          margin-bottom: 40px;
        }
        
        .login-panel-info h2 {
          font-size: 38px;
          line-height: 1.2;
          margin-bottom: 20px;
        }
        
        .login-panel-info p {
          font-size: 15px;
          color: var(--color-gray-400);
          line-height: 1.6;
          max-width: 380px;
        }
        
        .login-info-footer {
          font-size: 12px;
          color: var(--color-gray-600);
        }
        
        .login-panel-form {
          padding: 60px 80px;
          color: var(--color-black);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .form-header {
          margin-bottom: 36px;
        }
        
        .form-header h3 {
          font-size: 28px;
          margin-bottom: 8px;
        }
        
        .form-header p {
          font-size: 14px;
          color: var(--color-gray-500);
        }
        
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .form-group label {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-gray-700);
        }
        
        .form-input {
          padding: 12px 16px;
          border-radius: 6px;
          border: 1px solid var(--color-gray-300);
          font-family: var(--font-body);
          font-size: 14px;
          outline: none;
          transition: all 0.2s ease;
          background-color: var(--color-gray-50);
          caret-color: transparent !important;
        }
        
        .form-input:focus {
          border-color: var(--color-black);
          background-color: var(--color-white);
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
        }

        .custom-caret {
          position: absolute;
          width: 2px;
          background-color: var(--color-black);
          pointer-events: none;
          z-index: 10;
          opacity: 0;
          transition: left 0.08s cubic-bezier(0.25, 1, 0.5, 1), top 0.08s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.15s ease;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
        }
        @keyframes caretBlink {
          from, to { opacity: 0; }
          50% { opacity: 1; }
        }
        .custom-caret.blink {
          animation: caretBlink 1s step-end infinite;
        }
        
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
        }
        
        .remember-me {
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          color: var(--color-gray-700);
        }
        
        .remember-me input {
          accent-color: var(--color-black);
        }
        
        .forgot-link {
          color: var(--color-gray-500);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        .forgot-link:hover {
          color: var(--color-black);
          text-decoration: underline;
        }
        
        .submit-btn {
          background-color: var(--color-black);
          color: var(--color-white);
          border: 1px solid var(--color-black);
          padding: 12px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 10px;
        }
        
        .submit-btn:hover {
          background-color: var(--color-white);
          color: var(--color-black);
        }
        
        .divider {
          position: relative;
          text-align: center;
          margin: 24px 0;
        }
        
        .divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: var(--color-gray-200);
          z-index: 1;
        }
        
        .divider-text {
          position: relative;
          background-color: var(--color-white);
          padding: 0 12px;
          font-size: 12px;
          color: var(--color-gray-400);
          z-index: 2;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .oauth-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        
        .oauth-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          border-radius: 6px;
          border: 1px solid var(--color-gray-300);
          background-color: var(--color-white);
          color: var(--color-gray-800);
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .oauth-btn:hover {
          border-color: var(--color-black);
          color: var(--color-black);
          background-color: var(--color-gray-50);
        }
        
        .oauth-icon {
          width: 16px;
          height: 16px;
        }
        
        .back-home {
          position: absolute;
          top: 20px;
          left: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--color-gray-400);
          text-decoration: none;
          font-size: 13px;
          transition: color 0.2s ease;
          z-index: 10;
        }
        
        .back-home:hover {
          color: var(--color-white);
        }
        
        @media (max-width: 900px) {
          .login-container {
            grid-template-columns: 1fr;
            max-width: 480px;
          }
          .login-panel-info {
            display: none;
          }
          .login-panel-form {
            padding: 40px 30px;
          }
        }

        .login-redirect-link {
          color: var(--color-gray-500);
          text-decoration: none;
          transition: color 0.2s ease;
          font-size: 13px;
          text-align: center;
          margin-top: 18px;
        }
        
        .login-redirect-link a {
          color: var(--color-black);
          font-weight: 600;
          text-decoration: none;
        }
        
        .login-redirect-link a:hover {
          text-decoration: underline;
        }
        
        .back-home {
          color: var(--color-gray-400);
          transition: color 0.3s ease;
        }
        .back-home:hover {
          color: var(--color-white) !important;
        }
        .back-home:hover .chevron-left-svg {
          transform: translateX(-2px);
        }
        .back-home:hover .arrow-line-back {
          transform: scaleX(1);
          left: 6px;
        }

        .alert-success {
          background-color: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #15803d;
          padding: 12px 16px;
          border-radius: 6px;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .alert-error {
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          color: #b91c1c;
          padding: 12px 16px;
          border-radius: 6px;
          font-size: 14px;
          margin-bottom: 20px;
        }
      `}</style>

      <div className="login-container animate-in fade-in zoom-in-95 duration-500">
        {/* Left panel (branded) */}
        <div className="login-panel-info">
          <Link to="/" className="back-home group" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--color-gray-400)', transition: 'color 0.3s', fontSize: '14px', fontWeight: 500 }}>
            <span className="animated-back-arrow" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px' }}>
              <svg className="chevron-left-svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ width: '16px', height: '16px', transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="arrow-line-back" style={{ position: 'absolute', left: '9px', height: '2px', width: '8px', background: 'currentColor', transformOrigin: 'left', transform: 'scaleX(0)', borderRadius: '1px', transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), left 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}></span>
            </span>
            Back to website
          </Link>
          
          <div className="login-info-header">
            <Link to="/" className="logo-container" title="Vericode AI" style={{ textDecoration: 'none' }}>
              <img src="/logo_white.jpg" alt="Vericode AI Logo" className="logo-img" style={{ mixBlendMode: 'screen', height: '32px' }} />
              <span className="logo-text" style={{ color: 'var(--color-white)' }}>VERICODE AI</span>
            </Link>
            <h2 style={{ marginTop: '40px' }}>Pick up right where you left off.</h2>
            <p style={{ marginTop: '16px' }}>
              Sign in to reach your saved workspaces, get your recent LeetCode runs back, and keep the ChatGPT tutor a keystroke away.
            </p>
          </div>

          <div className="login-info-footer">
            <span>&copy; 2026 Vericode AI. Made for people who build.</span>
          </div>
        </div>
        
        {/* Right panel (form) */}
        <div className="login-panel-form">
          <div className="form-header">
            <h3>Welcome back</h3>
            <p>{show2fa ? 'Enter your verification code' : 'Enter your details and we will get you back in'}</p>
          </div>

          {success && <div className="alert-success">{success}</div>}
          {error && <div className="alert-error">{error}</div>}
          
          <form className="login-form" onSubmit={handleSubmit} style={{ display: !show2fa ? 'flex' : 'none' }}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <div style={{ position: 'relative', display: 'flex', width: '100%' }}>
                <input 
                  type="text" 
                  inputMode="email" 
                  id="email" 
                  className="form-input" 
                  style={{ width: '100%' }} 
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  disabled={isLoading}
                />
                <div id="email-caret" className="custom-caret"></div>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div style={{ position: 'relative', display: 'flex', width: '100%' }}>
                <input 
                  type="password" 
                  id="password" 
                  className="form-input" 
                  style={{ width: '100%' }} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  disabled={isLoading}
                />
                <div id="password-caret" className="custom-caret"></div>
              </div>
            </div>
            
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
            </div>
            
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* 2FA OTP Code Form */}
          <form className="login-form" onSubmit={handleVerify2FA} style={{ display: show2fa ? 'flex' : 'none' }}>
            <div className="form-group">
              <label htmlFor="otp">2FA Security Code</label>
              <p style={{ fontSize: '13px', color: 'var(--color-gray-500)', margin: '0 0 8px 0', textTransform: 'none' }}>
                Please enter the 6-digit verification code sent to your email.
              </p>
              <div style={{ position: 'relative', display: 'flex', width: '100%' }}>
                <input 
                  type="text" 
                  id="otp" 
                  className="form-input" 
                  style={{ width: '100%', letterSpacing: '6px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }} 
                  placeholder="••••••" 
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required 
                  disabled={isLoading}
                />
                <div id="otp-caret" className="custom-caret"></div>
              </div>
            </div>
            
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify & Sign In'}
            </button>
            
            <button 
              type="button" 
              className="submit-btn" 
              style={{ backgroundColor: 'transparent', color: 'var(--color-black)', border: '1px solid var(--color-gray-300)', marginTop: '0px' }}
              onClick={() => { setShow2fa(false); setError(''); setSuccess(''); }}
            >
              Back to Login
            </button>
          </form>
          
          <div className="divider">
            <span className="divider-text">Or continue with</span>
          </div>
          
          <div className="oauth-container">
            <button className="oauth-btn" type="button" onClick={async () => {
              // Try backend; if it's down, use mock login
              try {
                const res = await fetch('/api/auth/github', { method: 'HEAD' });
                if (res.ok || res.status === 302 || res.status === 301) {
                  window.location.href = '/api/auth/github';
                  return;
                }
              } catch (_) { /* backend offline — fall through to mock */ }
              // Mock GitHub OAuth
              localStorage.setItem('token', 'mock_github_token_' + Date.now());
              localStorage.setItem('mock_user', JSON.stringify({ name: 'GitHub User', email: 'github@vericode.ai' }));
              navigate('/dashboard');
            }}>
              <svg className="oauth-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              GitHub
            </button>

            <button className="oauth-btn" type="button" onClick={async () => {
              // Try backend; if it's down, use mock login
              try {
                const res = await fetch('/api/auth/google', { method: 'HEAD' });
                if (res.ok || res.status === 302 || res.status === 301) {
                  window.location.href = '/api/auth/google';
                  return;
                }
              } catch (_) { /* backend offline — fall through to mock */ }
              // Mock Google OAuth
              localStorage.setItem('token', 'mock_google_token_' + Date.now());
              localStorage.setItem('mock_user', JSON.stringify({ name: 'Google User', email: 'google@vericode.ai' }));
              navigate('/dashboard');
            }}>
              <svg className="oauth-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.51 0-6.386-2.876-6.386-6.386 0-3.51 2.876-6.386 6.386-6.386 1.554 0 2.973.565 4.075 1.583l3.073-3.073C19.206 2.296 16.02 1 12.24 1 6.033 1 12.24 6.033 12.24 11.24s5.033 11.24 11.24 11.24c6.262 0 11.24-5.067 11.24-11.24 0-.82-.083-1.613-.238-2.385H12.24z"/>
              </svg>
              Google
            </button>
          </div>
          
          <div className="login-redirect-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
