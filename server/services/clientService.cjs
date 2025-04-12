// services/clientService.cjs
const db = require('../utils/db.cjs');

// Get all clients
exports.getAllClients = async () => {
  const [rows] = await db.query('SELECT * FROM clients ORDER BY id DESC');
  return rows;
};

// Get a single client by ID
exports.getClientById = async (id) => {
  const [rows] = await db.query('SELECT * FROM clients WHERE id = ?', [id]);
  return rows[0] || null;
};

// Create a new client
exports.createClient = async (name, phone, email, address) => {
  const [result] = await db.query(
    'INSERT INTO clients (name, phone, email, address) VALUES (?, ?, ?, ?)',
    [name, phone, email, address]
  );

  return {
    id: result.insertId,
    name,
    phone,
    email,
    address,
  };
};

// Update client by ID
exports.updateClient = async (id, name, phone, email, address) => {
  await db.query(
    'UPDATE clients SET name = ?, phone = ?, email = ?, address = ? WHERE id = ?',
    [name, phone, email, address, id]
  );

  return { id, name, phone, email, address };
};

// Delete client by ID
exports.deleteClient = async (id) => {
  await db.query('DELETE FROM clients WHERE id = ?', [id]);
  return { success: true, message: 'Client deleted successfully' };
};
