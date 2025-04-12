const { defineEventHandler, getRouterParam, readBody } = require('h3');
const vaccinationService = require('../../services/vaccinationService.cjs');

module.exports = defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const { method } = event.node.req;

  // Handle GET request to fetch a specific vaccination record by ID
  if (method === 'GET') {
    const vaccination = await vaccinationService.getVaccinationRecordById(id);
    return vaccination || { error: 'Vaccination record not found' };
  }

  // Handle PUT request to update a specific vaccination record by ID
  if (method === 'PUT') {
    const body = await readBody(event);
    const {
      vaccine_id,
      vaccine_name,
      vaccine_unit,
      total_purchased,
      total_used,
      wasted,
      in_stock,
      assigned_batch_quantity,
    } = body;

    // Validate required fields
    if (
      !vaccine_id ||
      !vaccine_name ||
      !vaccine_unit ||
      total_purchased === undefined ||
      total_used === undefined ||
      wasted === undefined ||
      in_stock === undefined ||
      assigned_batch_quantity === undefined
    ) {
      return { error: 'All fields are required for vaccination list update.' };
    }

    const updatedVaccinationRecord = await vaccinationService.updateVaccinationRecord(
      id,
      vaccine_id,
      vaccine_name,
      vaccine_unit,
      total_purchased,
      total_used,
      wasted,
      in_stock,
      assigned_batch_quantity
    );
    return updatedVaccinationRecord;
  }

  // Handle DELETE request to delete a specific vaccination record by ID
  if (method === 'DELETE') {
    await vaccinationService.deleteVaccinationRecord(id);
    return { message: 'Vaccination record deleted successfully' };
  }

  return { error: 'Method not allowed' };
});
