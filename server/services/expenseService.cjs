const db = require('../utils/db.cjs');

// Get all expenses
exports.getAllExpenses = async () => {
  const [rows] = await db.query('SELECT * FROM expenses ORDER BY date DESC');
  return rows;
};

// Get expense by ID
exports.getExpenseById = async (id) => {
  const [rows] = await db.query('SELECT * FROM expenses WHERE id = ?', [id]);
  return rows[0] || null;
};

// Create new expense
exports.createExpense = async (id, name, category, amount, paid, paid_by, date, description) => {
  const [result] = await db.query(
    `INSERT INTO expenses (id, name, category, amount, paid, paid_by, date, description)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, name, category, amount, paid, paid_by, date, description]
  );

  return {
    id,
    name,
    category,
    amount,
    paid,
    paid_by,
    date,
    description,
  };
};

// Update existing expense
exports.updateExpense = async (id, name, category, amount, paid, paid_by, date, description) => {
  await db.query(
    `UPDATE expenses SET name = ?, category = ?, amount = ?, paid = ?, paid_by = ?, date = ?, description = ?
     WHERE id = ?`,
    [name, category, amount, paid, paid_by, date, description, id]
  );

  return {
    id,
    name,
    category,
    amount,
    paid,
    paid_by,
    date,
    description,
  };
};

// Delete expense
exports.deleteExpense = async (id) => {
  await db.query('DELETE FROM expenses WHERE id = ?', [id]);
  return { success: true, message: 'Expense deleted successfully' };
};
