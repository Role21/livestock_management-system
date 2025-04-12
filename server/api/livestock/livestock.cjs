const { defineEventHandler, readBody } = require('h3');
const livestockService = require('../../../services/livestockService.cjs');

module.exports = defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    try {
      const livestockList = await livestockService.getAllLivestock();
      return livestockList;
    } catch (err) {
      return { error: err.message };
    }
  }

  if (method === 'POST') {
    const body = await readBody(event);
    const { name, description } = body;

    if (!name) return { error: 'Livestock Name is required' };

    try {
      const newLivestock = await livestockService.createLivestock({ name, description });
      return { message: 'Livestock added successfully', livestock: newLivestock };
    } catch (err) {
      return { error: err.message };
    }
  }

  return { error: 'Method not allowed' };
});
