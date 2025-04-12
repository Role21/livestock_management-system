const { defineEventHandler, readBody, setCookie } = require('h3');
const { generateToken } = require('../../utils/session.cjs');
const { authenticateUser } = require('../../services/authService.cjs');

module.exports = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = await authenticateUser(body.email, body.password);

  if (!user) {
    return { error: 'Invalid credentials' };
  }

  // Generate session token and save to DB
  const token = await generateToken(user.id); // stores session in DB with expiration

  // Set the token as cookie
  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
});
