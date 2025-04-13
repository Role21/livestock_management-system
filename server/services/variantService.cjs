const db = require('../utils/db');

async function getVariantsByLivestockId(livestockId) {
  const [rows] = await db.query(
    'SELECT * FROM variant WHERE livestockId = ? ORDER BY createdAt DESC',
    [livestockId]
  );
  return rows;
}

async function addVariant(data) {
  const { livestockId, typeTitle, description } = data;
  const [result] = await db.query(
    'INSERT INTO variant (livestockId, typeTitle, description) VALUES (?, ?, ?)',
    [livestockId, typeTitle, description]
  );
  return { id: result.insertId, ...data };
}

async function updateVariant(id, data) {
  const { typeTitle, description } = data;
  await db.query(
    'UPDATE variant SET typeTitle = ?, description = ? WHERE id = ?',
    [typeTitle, description, id]
  );
  return { id, ...data };
}

async function deleteVariant(id) {
  await db.query('DELETE FROM variant WHERE id = ?', [id]);
}

module.exports = {
  getVariantsByLivestockId,
  addVariant,
  updateVariant,
  deleteVariant
};
