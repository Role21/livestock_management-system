const { defineEventHandler, getRouterParam, readBody, createError, sendError } = require('h3');
const profileService = require('../../../services/profileService.cjs');
const { getUserSession } = require('../../../utils/session.cjs'); // Auth util

module.exports = defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id'); // Extracts 'id' from URL params (e.g., /profile/1)
  const method = event.node.req.method; // Gets the HTTP method (GET, PUT, etc.)

  // Check if 'id' is provided in the request URL
  if (!id) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'User ID is required' }));
  }

  // Get the session for the current user (auth check)
  const session = await getUserSession(event);

  // If no session (not logged in), return an Unauthorized error
  if (!session) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }));
  }

  // Check if the user is trying to access their own profile or if they are an admin
  const isSelf = parseInt(id) === session.id;
  const isAdmin = session.role === 'admin';

  // Handle GET method to fetch the profile
  if (method === 'GET') {
    // Only allow access to the profile if it's their own or if they are an admin
    if (!isSelf && !isAdmin) {
      return sendError(event, createError({ statusCode: 403, statusMessage: 'Forbidden' }));
    }

    try {
      // Fetch the profile from the profileService
      const profile = await profileService.getProfileById(id);
      if (!profile) {
        return sendError(event, createError({ statusCode: 404, statusMessage: 'Profile not found' }));
      }
      return profile;
    } catch (error) {
      return sendError(event, createError({ statusCode: 500, statusMessage: error.message }));
    }
  }

  // Handle PUT method to update the profile
  if (method === 'PUT') {
    // Only allow updating if it's their own profile or if they are an admin
    if (!isSelf && !isAdmin) {
      return sendError(event, createError({ statusCode: 403, statusMessage: 'Forbidden' }));
    }

    try {
      // Read the body of the request (updated profile data)
      const body = await readBody(event);
      // Update the profile using the profileService
      const updated = await profileService.updateProfile(id, body);
      return {
        message: 'Profile updated successfully',
        profile: updated
      };
    } catch (error) {
      return sendError(event, createError({ statusCode: 500, statusMessage: error.message }));
    }
  }

  // If the HTTP method is not GET or PUT, return Method Not Allowed error
  return sendError(event, createError({ statusCode: 405, statusMessage: 'Method not allowed' }));
});
