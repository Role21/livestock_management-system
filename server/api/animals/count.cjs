import { defineEventHandler } from 'h3';
import * as animalService from '../../services/animalService.cjs';

export default defineEventHandler(async () => {
  try {
    const count = await animalService.getAnimalCount();
    return { count };
  } catch (error) {
    return { error: 'Failed to fetch animal count.' };
  }
});
