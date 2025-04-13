const variantService = require('../../services/variantService.cjs');

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const method = event.req.method;

  if (method === 'PUT') {
    const body = await readBody(event);
    return await variantService.updateVariant(id, body);
  }

  if (method === 'DELETE') {
    await variantService.deleteVariant(id);
    return { success: true };
  }

  return { statusCode: 405, message: 'Method Not Allowed' };
});
