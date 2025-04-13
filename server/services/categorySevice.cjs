const db = require('../utils/db'); // Assuming you're using a MySQL pool instance

// Get all categories
async function getAllCategories() {
  const [rows] = await db.query('SELECT * FROM categories ORDER BY id DESC');
  return rows;
}

// Get a single category by ID
async function getCategoryById(id) {
  const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
  return rows[0] || null;
}

// Create a new category
async function createCategory({ name, description }) {
  const [result] = await db.query(
    'INSERT INTO categories (name, description) VALUES (?, ?)',
    [name, description]
  );

  return {
    id: result.insertId,
    name,
    description,
  };
}

// Update a category
async function updateCategory(id, { name, description }) {
  await db.query(
    'UPDATE categories SET name = ?, description = ? WHERE id = ?',
    [name, description, id]
  );
}

// Delete a category
async function deleteCategory(id) {
  await db.query('DELETE FROM categories WHERE id = ?', [id]);
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
