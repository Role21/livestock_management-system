const { defineEventHandler, readBody } = require('h3');
const expenseService = require('../../services/expenseService.cjs');
const { db } = require('@/utils/db.cjs');

module.exports = defineEventHandler(async (event) => {
  const { method } = event.node.req;

  // GET: Fetch all expenses
  if (method === 'GET') {
    try {
      const expenses = await expenseService.getAllExpenses();
      return expenses;
    } catch (error) {
      return { error: error.message };
    }
  }

  // POST: Create a new expense
  if (method === 'POST') {
    const body = await readBody(event);
    const {
      id,          // optional, depending on your database setup
      name,
      category,
      amount,
      paid = 0,
      paidBy,
      date,
      description = ''
    } = body;

    // Validation
    if (!name || !category || !amount || !paidBy || !date) {
      return {
        error: 'Missing required fields: name, category, amount, paidBy, date'
      };
    }

    try {
      const result = await expenseService.createExpense({
        id, name, category, amount, paid, paidBy, date, description
      });
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  return { error: 'Method not allowed' };
});
