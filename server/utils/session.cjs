const { parseCookies } = require('h3');
const crypto = require('crypto');
const db = require('../utils/db.cjs');

// Generate a secure random token and store it in the DB
exports.generateToken = async function generateToken(userId) {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // expires in 7 days

  await db.query(
    'INSERT INTO sessions (user_id, token, expiresAt) VALUES (?, ?, ?)',
    [userId, token, expiresAt]
  );

  return token;
};

// Verify a token by checking if it exists and is still valid
exports.verifyToken = async function verifyToken(token) {
  const [rows] = await db.query(
    'SELECT * FROM sessions WHERE token = ? AND expiresAt > NOW()',
    [token]
  );

  return rows[0] || null; // Return session row or null
};

// Optional: Invalidate (logout) a token
exports.invalidateToken = async function invalidateToken(token) {
  await db.query('DELETE FROM sessions WHERE token = ?', [token]);
};

// Get the currently authenticated user's session and info
exports.getUserSession = async function getUserSession(event) {
  const cookies = parseCookies(event);
  const token = cookies?.token;

  if (!token) return null;

  const session = await exports.verifyToken(token);
  if (!session) return null;

  const [users] = await db.query('SELECT id, name, email, role FROM users WHERE id = ?', [session.user_id]);
  const user = users[0];

  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
};
