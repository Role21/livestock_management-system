const { defineEventHandler, setCookie } = require('h3');

module.exports = defineEventHandler(async (event) => {
  // Clear the auth cookie
  setCookie(event, 'user_id', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0, // Expire immediately
  });

  return { success: true, message: 'Logged out successfully' };
});
