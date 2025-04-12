const db = require('../utils/db.cjs');

// Get all settings
exports.getAllSettings = async () => {
  const [rows] = await db.query('SELECT * FROM settings');
  return rows;
};

// Get setting by ID
exports.getSettingById = async (id) => {
  const [rows] = await db.query('SELECT * FROM settings WHERE id = ?', [id]);
  return rows[0];
};

// Create new setting
exports.createSetting = async ({ key, value }) => {
  const [result] = await db.query(
    'INSERT INTO settings (key, value) VALUES (?, ?)',
    [key, value]
  );
  return { id: result.insertId, key, value };
};

// Update setting by ID
exports.updateSetting = async (id, { key, value }) => {
  const [result] = await db.query(
    'UPDATE settings SET key = ?, value = ? WHERE id = ?',
    [key, value, id]
  );
  return result;
};

// Delete setting
exports.deleteSetting = async (id) => {
  const [result] = await db.query('DELETE FROM settings WHERE id = ?', [id]);
  return result;
};
