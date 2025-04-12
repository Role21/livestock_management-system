// server/api/expense.cjs

const { defineEventHandler, readBody } = require('h3');
const expenseService = require('../../services/expenseService.cjs'); // Import service functions

module.exports = defineEventHandler(async (event) => {
  const { method } = event.node.req;

  if (method === 'GET') {
    // List all expenses
    try {
      const expenses = await expenseService.getAllExpenses();
      return expenses;
    } catch (error) {
      return { error: error.message };
    }
  }

  if (method === 'POST') {
    // Add a new expense
    const body = await readBody(event);
    const { id, name, category, amount, paid, paidBy, date, description } = body;

    // Validate input
    if (!id || !name || !category || !amount || !paidBy || !date) {
      return { error: 'id, name, category, amount, paidBy, and date are required.' };
    }

    try {
      const result = await expenseService.createExpense({
        id,
        name,
        category,
        amount,
        paid: paid || 0,
        paidBy,
        date,
        description
      });
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  return { error: 'Method not allowed' };
});
