// server/api/supplier/[id].cjs

const { defineEventHandler, getRouterParam, readBody } = require('h3');
const supplierService = require('../../services/supplierService.cjs');

module.exports = defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const method = event.node.req.method;

  if (method === 'GET') {
    return await supplierService.getSupplierById(id);
  }

  if (method === 'PUT') {
    const body = await readBody(event);
    return await supplierService.updateSupplier(id, body);
  }

  if (method === 'DELETE') {
    return await supplierService.deleteSupplier(id);
  }

  return { error: 'Method not allowed' };
});
