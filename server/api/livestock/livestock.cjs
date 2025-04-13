const livestockService = require('../../services/livestockService.cjs');
const { db } = require('@/utils/db.cjs');

export default defineEventHandler(async (event) => {
  const method = event.req.method;

  if (method === 'GET') {
    return await livestockService.getAllLivestock();
  }

  if (method === 'POST') {
    const body = await readBody(event);
    return await livestockService.addLivestock(body);
  }

  return { statusCode: 405, message: 'Method Not Allowed' };
});
