import { defineEventHandler, readBody } from 'h3';
import * as vaccinationService from '../services/vaccinationService.cjs';

export default defineEventHandler(async (event) => {
  const { method } = event.node.req;

  if (method === 'POST') {
    const body = await readBody(event);
    const { route_id, animal_ids } = body;

    if (!route_id || !Array.isArray(animal_ids)) {
      return { error: 'route_id and animal_ids[] are required.' };
    }

    try {
      const routing = await vaccinationService.assignRouting(route_id, animal_ids);
      return { message: 'Routing assigned successfully', routing };
    } catch (error) {
      return { error: error.message };
    }
  }

  return { error: 'Method not allowed' };
});
