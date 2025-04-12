const { defineEventHandler } = require('h3');
const profileService = require('../../../services/profileService.cjs');

module.exports = defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    try {
      const profiles = await profileService.getAllProfiles();
      return profiles;
    } catch (error) {
      return { error: error.message };
    }
  }

  return { error: 'Method not allowed' };
});
