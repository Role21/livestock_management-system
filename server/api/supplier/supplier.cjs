// server/api/supplier.cjs

const { defineEventHandler, readBody } = require('h3');
const supplierService = require('../../services/supplierService.cjs');

module.exports = defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    return await supplierService.getAllSuppliers();
  }

  if (method === 'POST') {
    const body = await readBody(event);
    return await supplierService.createSupplier(body);
  }

  return { error: 'Method not allowed' };
});
