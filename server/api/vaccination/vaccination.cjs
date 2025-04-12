const { defineEventHandler, readBody } = require('h3');
const vaccinationService = require('../../services/vaccinationService.cjs');

module.exports = defineEventHandler(async (event) => {
  const { method } = event.node.req;
  const url = event.node.req.url;

  // Vaccination List
  if (method === 'GET' && url === '/server/api/vaccination/list') {
    try {
      return await vaccinationService.getVaccinationList();
    } catch (error) {
      return { error: error.message };
    }
  }

  if (method === 'POST' && url === '/server/api/vaccination/list') {
    const body = await readBody(event);
    const { vaccine_id, vaccine_name, vaccine_unit, total_purchased, total_used, wasted, in_stock, assigned_batch_quantity } = body;

    if (!vaccine_id || !vaccine_name || !vaccine_unit || total_purchased === undefined || total_used === undefined || wasted === undefined || in_stock === undefined || assigned_batch_quantity === undefined) {
      return { error: 'All fields are required: vaccine_id, vaccine_name, vaccine_unit, total_purchased, total_used, wasted, in_stock, and assigned_batch_quantity' };
    }

    try {
      const newVaccination = await vaccinationService.createVaccinationList(
        vaccine_id, vaccine_name, vaccine_unit, total_purchased, total_used, wasted, in_stock, assigned_batch_quantity
      );
      return { message: 'Vaccination record created successfully', vaccination: newVaccination };
    } catch (error) {
      return { error: error.message };
    }
  }

  // Vaccination Schedule
  if (method === 'GET' && url === '/server/api/vaccination/schedule') {
    try {
      return await vaccinationService.getVaccinationSchedule();
    } catch (error) {
      return { error: error.message };
    }
  }

  if (method === 'POST' && url === '/server/api/vaccination/schedule') {
    const body = await readBody(event);
    const { shed, assigned_livestock, sold, death, in_stock, last_issue_date, last_vaccinated, next_vaccination } = body;

    if (!shed || !assigned_livestock || sold === undefined || death === undefined || in_stock === undefined || !last_issue_date || !last_vaccinated || !next_vaccination) {
      return { error: 'All fields are required: shed, assigned_livestock, sold, death, in_stock, last_issue_date, last_vaccinated, and next_vaccination' };
    }

    try {
      const newSchedule = await vaccinationService.createVaccinationSchedule(
        shed, assigned_livestock, sold, death, in_stock, last_issue_date, last_vaccinated, next_vaccination
      );
      return { message: 'Vaccination schedule created successfully', schedule: newSchedule };
    } catch (error) {
      return { error: error.message };
    }
  }

  // Vaccine Purchase
  if (method === 'GET' && url === '/server/api/vaccination/purchase') {
    try {
      return await vaccinationService.getVaccinePurchase();
    } catch (error) {
      return { error: error.message };
    }
  }

  if (method === 'POST' && url === '/server/api/vaccination/purchase') {
    const body = await readBody(event);
    const { purchase_date, supplier, total_amount } = body;

    if (!purchase_date || !supplier || total_amount === undefined) {
      return { error: 'All fields are required: purchase_date, supplier, and total_amount' };
    }

    try {
      const newPurchase = await vaccinationService.createVaccinePurchase(purchase_date, supplier, total_amount);
      return { message: 'Vaccine purchase record created successfully', purchase: newPurchase };
    } catch (error) {
      return { error: error.message };
    }
  }

  // Vaccination Routing
  if (method === 'GET' && url === '/server/api/vaccination/routing') {
    try {
      return await vaccinationService.getVaccinationRouting();
    } catch (error) {
      return { error: error.message };
    }
  }

  if (method === 'POST' && url === '/server/api/vaccination/routing') {
    const body = await readBody(event);
    const { route_name, note } = body;

    if (!route_name || !note) {
      return { error: 'Both route_name and note are required' };
    }

    try {
      const newRouting = await vaccinationService.createVaccinationRouting(route_name, note);
      return { message: 'Vaccination routing record created successfully', routing: newRouting };
    } catch (error) {
      return { error: error.message };
    }
  }

  return { error: 'Method not allowed' };
});
