// utils/session.cjs
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
