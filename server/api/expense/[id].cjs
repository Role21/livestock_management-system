const { defineEventHandler, getMethod, readBody, setResponseStatus } = require('h3');
const expenseService = require('../../services/expenseService.cjs');

module.exports = defineEventHandler(async (event) => {
  const method = getMethod(event);
  const { id } = event.context.params;

  if (method === 'GET') {
    const expense = await expenseService.getExpenseById(id);
    if (!expense) {
      setResponseStatus(event, 404);
      return { error: 'Expense not found' };
    }
    return expense;
  }

  if (method === 'PUT') {
    const body = await readBody(event);
    const result = await expenseService.updateExpense(id, body);
    return { message: 'Expense updated', result };
  }

  if (method === 'DELETE') {
    const result = await expenseService.deleteExpense(id);
    return { message: 'Expense deleted', result };
  }

  setResponseStatus(event, 405);
  return { error: 'Method Not Allowed' };
});
