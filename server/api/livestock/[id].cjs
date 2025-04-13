const livestockService = require('../../services/livestockService.cjs');
const { db } = require('@/utils/db.cjs');

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const method = event.req.method;

  if (method === 'GET') {
    return await livestockService.getLivestockById(id);
  }

  if (method === 'PUT') {
    const body = await readBody(event);
    return await livestockService.updateLivestock(id, body);
  }

  if (method === 'DELETE') {
    await livestockService.deleteLivestock(id);
    return { success: true };
  }

  return { statusCode: 405, message: 'Method Not Allowed' };
});
