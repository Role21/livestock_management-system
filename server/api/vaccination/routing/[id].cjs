// server/api/vaccinations/vaccinationrouting/[id].cjs

const { defineEventHandler, getRouterParam } = require('h3');
const routingService = require('../../../services/vaccinationService.cjs');

module.exports = defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const { method } = event.node.req;

  if (method === 'GET') {
    try {
      const route = await routingService.getVaccinationRoutingById(id);
      if (!route) return { error: 'Vaccination routing not found' };
      return route;
    } catch (error) {
      return { error: error.message };
    }
  }

  return { error: 'Method not allowed' };
});
