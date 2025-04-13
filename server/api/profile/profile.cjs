const { defineEventHandler, createError, sendError } = require('h3')
const profileService = require('../../../services/profileService.cjs')
const { getUserSession } = require('../../../utils/session.cjs')
const { db } = require('@/utils/db.cjs'); // your session util

module.exports = defineEventHandler(async (event) => {
  const method = event.node.req.method

  // Retrieve session data
  const session = await getUserSession(event)

  // Check if the session exists and the user is an admin
  if (!session || session.role !== 'admin') {
    console.log('Unauthorized access attempt:', session); // Log session info for debugging
    return sendError(event, createError({ statusCode: 403, statusMessage: 'Forbidden' }))
  }

  if (method === 'GET') {
    try {
      // Fetch all profiles
      const profiles = await profileService.getAllProfiles()
      return profiles
    } catch (error) {
      console.error('Error fetching profiles:', error.message) // Log the error
      return sendError(event, createError({ statusCode: 500, statusMessage: error.message }))
    }
  }

  if (method === 'POST') {
    try {
      // Create a new profile (data should come from the request body)
      const body = await readBody(event)
      const newProfile = await profileService.createProfile(body) // Implement this method in the service
      return { message: 'Profile created successfully', profile: newProfile }
    } catch (error) {
      console.error('Error creating profile:', error.message) // Log the error
      return sendError(event, createError({ statusCode: 500, statusMessage: error.message }))
    }
  }

  if (method === 'PUT') {
    try {
      // Update a profile (data should come from the request body)
      const id = getRouterParam(event, 'id')
      const body = await readBody(event)
      const updatedProfile = await profileService.updateProfile(id, body) // Assume `id` is provided in the URL
      return { message: 'Profile updated successfully', profile: updatedProfile }
    } catch (error) {
      console.error('Error updating profile:', error.message) // Log the error
      return sendError(event, createError({ statusCode: 500, statusMessage: error.message }))
    }
  }

  if (method === 'DELETE') {
    try {
      // Delete a profile
      const id = getRouterParam(event, 'id')
      await profileService.deleteProfile(id) // Implement this method in the service
      return { message: 'Profile deleted successfully' }
    } catch (error) {
      console.error('Error deleting profile:', error.message) // Log the error
      return sendError(event, createError({ statusCode: 500, statusMessage: error.message }))
    }
  }

  // If method is not allowed, return 405
  return sendError(event, createError({ statusCode: 405, statusMessage: 'Method not allowed' }))
})
