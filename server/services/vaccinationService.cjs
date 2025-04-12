const { query } = require('../utils/db.cjs');

// ------------------ Vaccination List ------------------

exports.getVaccinationList = async () => {
  return await query('SELECT * FROM VaccinationList');
};

exports.getVaccinationListById = async (id) => {
  const result = await query('SELECT * FROM VaccinationList WHERE SL_No = ?', [id]);
  return result[0];
};

exports.createVaccinationList = async (vaccine_id, vaccine_name, vaccine_unit, total_purchased, total_used, wasted, in_stock, assigned_batch_quantity) => {
  const result = await query(
    `INSERT INTO VaccinationList (vaccine_id, vaccine_name, vaccine_unit, total_purchased, total_used, wasted, in_stock, assigned_batch_quantity)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [vaccine_id, vaccine_name, vaccine_unit, total_purchased, total_used, wasted, in_stock, assigned_batch_quantity]
  );
  return {
    SL_No: result.insertId,
    vaccine_id,
    vaccine_name,
    vaccine_unit,
    total_purchased,
    total_used,
    wasted,
    in_stock,
    assigned_batch_quantity
  };
};

// ------------------ Vaccination Schedule ------------------

exports.getVaccinationSchedule = async () => {
  return await query('SELECT * FROM VaccinationSchedule');
};

exports.getVaccinationScheduleById = async (id) => {
  const result = await query('SELECT * FROM VaccinationSchedule WHERE SL_No = ?', [id]);
  return result[0];
};

exports.createVaccinationSchedule = async (shed, assigned_livestock, sold, death, in_stock, last_issue_date, last_vaccinated, next_vaccination) => {
  const result = await query(
    `INSERT INTO VaccinationSchedule (shed, assigned_livestock, sold, death, in_stock, last_issue_date, last_vaccinated, next_vaccination)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [shed, assigned_livestock, sold, death, in_stock, last_issue_date, last_vaccinated, next_vaccination]
  );
  return {
    SL_No: result.insertId,
    shed,
    assigned_livestock,
    sold,
    death,
    in_stock,
    last_issue_date,
    last_vaccinated,
    next_vaccination
  };
};

// ------------------ Vaccine Purchase ------------------

exports.getVaccinePurchase = async () => {
  return await query('SELECT * FROM VaccinePurchase');
};

exports.getVaccinePurchaseById = async (id) => {
  const result = await query('SELECT * FROM VaccinePurchase WHERE SL_No = ?', [id]);
  return result[0];
};

exports.createVaccinePurchase = async (purchase_date, supplier, total_amount) => {
  const result = await query(
    `INSERT INTO VaccinePurchase (purchase_date, supplier, total_amount)
     VALUES (?, ?, ?)`,
    [purchase_date, supplier, total_amount]
  );
  return {
    SL_No: result.insertId,
    purchase_date,
    supplier,
    total_amount
  };
};

// ------------------ Vaccination Routing ------------------

exports.getVaccinationRouting = async () => {
  return await query('SELECT * FROM VaccinationRouting');
};

exports.getVaccinationRoutingById = async (id) => {
  const result = await query('SELECT * FROM VaccinationRouting WHERE SL_No = ?', [id]);
  return result[0];
};

exports.createVaccinationRouting = async (route_name, note) => {
  const result = await query(
    `INSERT INTO VaccinationRouting (route_name, note)
     VALUES (?, ?)`,
    [route_name, note]
  );
  return {
    SL_No: result.insertId,
    route_name,
    note
  };
};
