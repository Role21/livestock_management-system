const { defineEventHandler, readBody } = require('h3');
const db = require('../../utils/db.cjs');
const bcrypt = require('bcryptjs');

module.exports = defineEventHandler(async (event) => {
  const { token, password } = await readBody(event);

  if (!token || !password) {
    return { error: 'Invalid request' };
  }

  // Check if the token is valid and not expired
  const [rows] = await db.query(
    'SELECT * FROM password_resets WHERE token = ? AND expires_at > NOW()',
    [token]
  );

  if (rows.length === 0) {
    return { error: 'Invalid or expired token' };
  }

  const resetEntry = rows[0];

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update user's password
  await db.query('UPDATE users SET password = ? WHERE email = ?', [
    hashedPassword,
    resetEntry.email,
  ]);

  // Delete the used token
  await db.query('DELETE FROM password_resets WHERE token = ?', [token]);

  return { message: 'Password reset successfully' };
});
