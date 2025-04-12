const { defineEventHandler, getRouterParam, readBody } = require('h3');
const livestockService = require('../../../services/livestockService.cjs');

module.exports = defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const method = event.node.req.method;

  if (!id) return { error: 'ID is required' };

  if (method === 'GET') {
    try {
      const livestock = await livestockService.getLivestockById(id);
      return livestock || { error: 'Livestock not found' };
    } catch (err) {
      return { error: err.message };
    }
  }

  if (method === 'PUT') {
    const body = await readBody(event);
    try {
      const updated = await livestockService.updateLivestock(id, body);
      return { message: 'Livestock updated successfully', livestock: updated };
    } catch (err) {
      return { error: err.message };
    }
  }

  if (method === 'DELETE') {
    try {
      await livestockService.deleteLivestock(id);
      return { message: 'Livestock deleted successfully' };
    } catch (err) {
      return { error: err.message };
    }
  }

  return { error: 'Method not allowed' };
});
