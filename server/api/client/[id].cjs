const { defineEventHandler, getRouterParam, readBody } = require('h3');
const clientService = require('../../services/clientService.cjs');

module.exports = defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const { method } = event.node.req;

  if (method === 'GET') {
    try {
      const client = await clientService.getClientById(id);
      if (!client) return { error: 'Client not found' };
      return client;
    } catch (error) {
      return { error: error.message };
    }
  }

  if (method === 'PUT') {
    const body = await readBody(event);
    const { name, phone, email, address } = body;

    if (!name || !phone) {
      return { error: 'Name and phone are required' };
    }

    try {
      const updated = await clientService.updateClient(id, name, phone, email, address);
      return updated;
    } catch (error) {
      return { error: error.message };
    }
  }

  if (method === 'DELETE') {
    try {
      const deleted = await clientService.deleteClient(id);
      return deleted;
    } catch (error) {
      return { error: error.message };
    }
  }

  return { error: 'Method not allowed' };
});
