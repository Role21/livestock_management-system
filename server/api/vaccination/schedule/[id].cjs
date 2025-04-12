// server/api/vaccinations/vaccinationschedule/[id].cjs

const { defineEventHandler, getRouterParam } = require('h3');
const scheduleService = require('../../../services/vaccinationService.cjs');

module.exports = defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const { method } = event.node.req;

  if (method === 'GET') {
    try {
      const schedule = await scheduleService.getVaccinationScheduleById(id);
      if (!schedule) return { error: 'Vaccination schedule not found' };
      return schedule;
    } catch (error) {
      return { error: error.message };
    }
  }

  return { error: 'Method not allowed' };
});
