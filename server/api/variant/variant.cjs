const variantService = require('../../services/variantService.cjs');

export default defineEventHandler(async (event) => {
  const method = event.req.method;

  if (method === 'GET') {
    const { livestockId } = getQuery(event);
    return await variantService.getVariantsByLivestockId(livestockId);
  }

  if (method === 'POST') {
    const body = await readBody(event);
    return await variantService.addVariant(body);
  }

  return { statusCode: 405, message: 'Method Not Allowed' };
});
