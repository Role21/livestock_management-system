import { defineEventHandler, readBody } from 'h3';
import * as animalService from '../services/animalService.cjs';  // Import animal service functions

export default defineEventHandler(async (event) => {
  const { method } = event.node.req;

  if (method === 'GET') {
    // Fetch all animal records
    try {
      const animals = await animalService.getAllAnimals();
      return animals;
    } catch (error) {
      return { error: error.message };
    }
  }

  if (method === 'POST') {
    const body = await readBody(event);
    const { 
      name, 
      species, 
      breed, 
      dob, 
      gender, 
      weight, 
      notes, 
      purchase_price, 
      sold_price, 
      quantity, 
      health_status 
    } = body;

    // Validate the input - ensure all required fields are provided
    if (!name || !species || !breed || !dob || !gender || !weight || !purchase_price || !sold_price || !quantity || !health_status) {
      return { error: 'name, species, breed, dob, gender, weight, purchase_price, sold_price, quantity, and health_status are required.' };
    }

    try {
      // Create the new animal
      const newAnimal = await animalService.createAnimal({
        name, 
        species, 
        breed, 
        dob, 
        gender, 
        weight, 
        notes, 
        purchase_price, 
        sold_price, 
        quantity, 
        health_status
      });
      return { message: 'Animal added successfully', animal: newAnimal };
    } catch (error) {
      return { error: error.message };
    }
  }

  return { error: 'Method not allowed' };  // If method is not GET or POST
});
