// server/api/animal/[id].cjs

import { defineEventHandler, getRouterParam, readBody } from 'h3';

import * as animalService from '../../services/animalService.cjs';  // Import animal service functions

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');  // Get ID from URL
  const { method } = event.node.req;

  if (method === 'GET') {
    // Fetch a specific animal record by ID
    try {
      const animal = await animalService.getAnimalById(id);
      if (!animal) return { error: 'Animal not found' };
      return animal;
    } catch (error) {
      return { error: error.message };
    }
  }

  if (method === 'PUT') {
    const body = await readBody(event);
    const { name, species, age, health_status } = body;

    // Validate input
    if (!name || !species || !age || !health_status) {
      return { error: 'name, species, age, and health_status are required.' };
    }

    try {
      const result = await animalService.updateAnimal(id, name, species, age, health_status);
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  if (method === 'DELETE') {
    try {
      const result = await animalService.deleteAnimal(id);
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  return { error: 'Method not allowed' };  // If method is not GET, PUT, or DELETE
});
