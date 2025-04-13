const db = require('../utils/db.cjs');

async function getAllLivestock() {
  const [rows] = await db.query('SELECT * FROM livestock');
  for (const livestock of rows) {
    const [variants] = await db.query('SELECT * FROM variant WHERE livestockId = ?', [livestock.id]);
    livestock.variants = variants;
  }
  return rows;
}

async function getLivestockById(id) {
  const [[livestock]] = await db.query('SELECT * FROM livestock WHERE id = ?', [id]);
  if (!livestock) return null;
  const [variants] = await db.query('SELECT * FROM variant WHERE livestockId = ?', [id]);
  livestock.variants = variants;
  return livestock;
}

async function addLivestock(data) {
  const { name, description } = data;
  const [result] = await db.query(
    'INSERT INTO livestock (name, description) VALUES (?, ?)',
    [name, description]
  );
  return { id: result.insertId, ...data };
}

async function updateLivestock(id, data) {
  const { name, description } = data;
  await db.query(
    'UPDATE livestock SET name = ?, description = ? WHERE id = ?',
    [name, description, id]
  );
  return { id, ...data };
}

async function deleteLivestock(id) {
  await db.query('DELETE FROM livestock WHERE id = ?', [id]);
}

module.exports = {
  getAllLivestock,
  getLivestockById,
  addLivestock,
  updateLivestock,
  deleteLivestock
};
