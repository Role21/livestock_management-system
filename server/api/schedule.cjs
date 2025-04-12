import { defineEventHandler, readBody } from 'h3';
import * as vaccinationService from '../services/vaccinationService.cjs';

export default defineEventHandler(async (event) => {
  const { method } = event.node.req;

  if (method === 'POST') {
    const body = await readBody(event);
    const { animal_id, vaccine_name, scheduled_date } = body;

    if (!animal_id || !vaccine_name || !scheduled_date) {
      return { error: 'animal_id, vaccine_name, and scheduled_date are required.' };
    }

    try {
      const schedule = await vaccinationService.scheduleVaccination({
        animal_id, vaccine_name, scheduled_date
      });
      return { message: 'Vaccination scheduled successfully', schedule };
    } catch (error) {
      return { error: error.message };
    }
  }

  return { error: 'Method not allowed' };
});
