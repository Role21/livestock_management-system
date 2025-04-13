// server/api/vaccinations/vaccinationpurchase/[id].cjs

const { db } = require('@/utils/db.cjs');
const { defineEventHandler, getRouterParam } = require('h3');
const purchaseService = require('../../services/vaccinationService.cjs');

module.exports = defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const { method } = event.node.req;

  if (method === 'GET') {
    try {
      const purchase = await purchaseService.getVaccinePurchaseById(id);
      if (!purchase) return { error: 'Vaccine purchase not found' };
      return purchase;
    } catch (error) {
      return { error: error.message };
    }
  }

  return { error: 'Method not allowed' };
});
