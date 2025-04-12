const { defineEventHandler, getRouterParam, readBody } = require('h3');
const profileService = require('../../../services/profileService.cjs');

module.exports = defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const method = event.node.req.method;

  if (!id) return { error: 'User ID is required' };

  if (method === 'GET') {
    try {
      const profile = await profileService.getProfileById(id);
      return profile || { error: 'Profile not found' };
    } catch (error) {
      return { error: error.message };
    }
  }

  if (method === 'PUT') {
    const body = await readBody(event);
    try {
      const updatedProfile = await profileService.updateProfile(id, body);
      return { message: 'Profile updated successfully', profile: updatedProfile };
    } catch (error) {
      return { error: error.message };
    }
  }

  return { error: 'Method not allowed' };
});
