const { defineEventHandler, getCookie } = require('h3');
const { verifyToken } = require('../../utils/session.cjs');
const { getUserById } = require('../../services/authService.cjs'); // or your user service

module.exports = defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');

  if (!token) return { authenticated: false };

  const session = await verifyToken(token);
  if (!session) return { authenticated: false };

  const user = await getUserById(session.user_id);
  return { authenticated: true, user };
});
