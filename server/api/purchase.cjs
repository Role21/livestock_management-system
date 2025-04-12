import { defineEventHandler, readBody } from 'h3';
import * as vaccinationService from '../services/vaccinationService.cjs';

export default defineEventHandler(async (event) => {
  const { method } = event.node.req;

  if (method === 'POST') {
    const body = await readBody(event);

    // Example required fields for a purchase
    const { animal_id, vaccine_type, cost, purchase_date } = body;

    if (!animal_id || !vaccine_type || !cost || !purchase_date) {
      return { error: 'animal_id, vaccine_type, cost, and purchase_date are required.' };
    }

    try {
      const purchase = await vaccinationService.createVaccinationPurchase({
        animal_id, vaccine_type, cost, purchase_date
      });
      return { message: 'Vaccination purchase recorded', purchase };
    } catch (error) {
      return { error: error.message };
    }
  }

  return { error: 'Method not allowed' };
});
