const db = require('../utils/db.cjs');

exports.getAllSuppliers = async () => {
  const [rows] = await db.query('SELECT * FROM suppliers');
  return rows;
};

exports.getSupplierById = async (id) => {
  const [rows] = await db.query('SELECT * FROM suppliers WHERE id = ?', [id]);
  return rows[0];
};

exports.createSupplier = async (data) => {
  const { name, email, phone, address, image } = data;
  const [result] = await db.query(
    'INSERT INTO suppliers (name, email, phone, address, image) VALUES (?, ?, ?, ?, ?)',
    [name, email, phone, address, image]
  );
  return { message: 'Supplier added successfully', id: result.insertId };
};

exports.updateSupplier = async (id, data) => {
  const { name, email, phone, address, image } = data;
  const [result] = await db.query(
    'UPDATE suppliers SET name = ?, email = ?, phone = ?, address = ?, image = ? WHERE id = ?',
    [name, email, phone, address, image, id]
  );
  return { message: 'Supplier updated successfully' };
};

exports.deleteSupplier = async (id) => {
  const [result] = await db.query('DELETE FROM suppliers WHERE id = ?', [id]);
  return { message: 'Supplier deleted successfully' };
};
