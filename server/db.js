import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'database.json');

// Ensure database file exists with initial structure
async function ensureDb() {
  try {
    await fs.access(dbPath);
  } catch (err) {
    const initialData = { users: [], otps: [], password_resets: [] };
    await fs.writeFile(dbPath, JSON.stringify(initialData, null, 2), 'utf8');
  }
}

// Read database contents
async function readDb() {
  await ensureDb();
  try {
    const data = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { users: [], otps: [], password_resets: [] };
  }
}

// Write database contents
async function writeDb(data) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

// Database helper operations
export const getUserByEmail = async (email) => {
  const db = await readDb();
  return db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
};

export const getUserById = async (id) => {
  const db = await readDb();
  return db.users.find(u => u.id === id);
};

export const getUserByGoogleId = async (googleId) => {
  const db = await readDb();
  return db.users.find(u => u.google_id === googleId);
};

export const getUserByGithubId = async (githubId) => {
  const db = await readDb();
  return db.users.find(u => u.github_id === githubId);
};

export const createUser = async ({ name, email, password = null, google_id = null, github_id = null }) => {
  const db = await readDb();
  
  // Double check uniqueness
  const exists = db.users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    throw new Error('User with this email already exists');
  }

  const newUser = {
    id: db.users.length > 0 ? Math.max(...db.users.map(u => u.id)) + 1 : 1,
    name,
    email: email.toLowerCase(),
    password, // Hashed password
    google_id,
    github_id,
    created_at: new Date().toISOString()
  };

  db.users.push(newUser);
  await writeDb(db);
  return newUser;
};

export const updateUserSocialId = async (userId, field, socialId) => {
  const db = await readDb();
  const userIndex = db.users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    db.users[userIndex][field] = socialId;
    await writeDb(db);
    return db.users[userIndex];
  }
  return null;
};

export const updateUserPassword = async (email, hashedPassword) => {
  const db = await readDb();
  const userIndex = db.users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (userIndex !== -1) {
    db.users[userIndex].password = hashedPassword;
    await writeDb(db);
    return true;
  }
  return false;
};

// OTP operations
export const createOtp = async (email, code, expiresAt) => {
  const db = await readDb();
  
  const newOtp = {
    id: db.otps.length > 0 ? Math.max(...db.otps.map(o => o.id)) + 1 : 1,
    email: email.toLowerCase(),
    code,
    expires_at: expiresAt.toISOString(),
    used: 0
  };

  db.otps.push(newOtp);
  await writeDb(db);
  return newOtp;
};

export const getValidOtp = async (email, code) => {
  const db = await readDb();
  const now = new Date();
  
  return db.otps.find(o => 
    o.email.toLowerCase() === email.toLowerCase() &&
    o.code === code &&
    o.used === 0 &&
    new Date(o.expires_at) > now
  );
};

export const markOtpUsed = async (otpId) => {
  const db = await readDb();
  const otpIndex = db.otps.findIndex(o => o.id === otpId);
  if (otpIndex !== -1) {
    db.otps[otpIndex].used = 1;
    await writeDb(db);
    return true;
  }
  return false;
};

// Password Reset operations
export const createPasswordReset = async (email, token, expiresAt) => {
  const db = await readDb();
  
  // Remove existing resets for this email to clean up
  db.password_resets = db.password_resets.filter(r => r.email.toLowerCase() !== email.toLowerCase());
  
  const newReset = {
    id: db.password_resets.length > 0 ? Math.max(...db.password_resets.map(r => r.id)) + 1 : 1,
    email: email.toLowerCase(),
    token,
    expires_at: expiresAt.toISOString()
  };

  db.password_resets.push(newReset);
  await writeDb(db);
  return newReset;
};

export const getValidPasswordReset = async (token) => {
  const db = await readDb();
  const now = new Date();
  
  return db.password_resets.find(r => 
    r.token === token &&
    new Date(r.expires_at) > now
  );
};

export const deletePasswordReset = async (token) => {
  const db = await readDb();
  db.password_resets = db.password_resets.filter(r => r.token !== token);
  await writeDb(db);
  return true;
};
