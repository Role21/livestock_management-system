const { defineEventHandler, readBody } = require('h3');
const bcrypt = require('bcryptjs');
const db = require('../../utils/db.cjs');


module.exports = defineEventHandler(async (event) => {
  const { name, email, password } = await readBody(event);

  if (!name || !email || !password) {
    return { error: 'All fields are required' };
  }

  // Check if user already exists
  const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
  if (existing.length > 0) {
    return { error: 'Email already registered' };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user
  const result = await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  );

  return {
    message: 'User registered successfully',
    userId: result.insertId
  };
});
