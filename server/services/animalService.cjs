import { query } from '../utils/db.cjs';

// Function to calculate age from dob
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const diff = Date.now() - birthDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)); // Approximation in years
};

export const getAllAnimals = async () => {
  return await query('SELECT * FROM Animals');
};

export const getAnimalById = async (id) => {
  const result = await query('SELECT * FROM Animals WHERE id = ?', [id]);
  return result[0] || null;
};

export const createAnimal = async (animalData) => {
  const {
    name,
    species,
    breed,
    dob,
    gender,
    weight,
    notes,
    purchase_price,
    sold_price,
    quantity,
    health_status,  // health_status is now a required field
  } = animalData;

  const age = calculateAge(dob);  // Calculate age from dob
  const createdAt = new Date();
  const updatedAt = new Date();

  const result = await query(
    `INSERT INTO Animals 
      (name, species, breed, dob, gender, weight, notes, age, health_status, purchase_price, sold_price, quantity, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, species, breed, dob, gender, weight, notes, age, health_status, purchase_price, sold_price, quantity, createdAt, updatedAt]
  );

  // Return the complete animal data including age and health_status
  return { 
    id: result.insertId, 
    name, 
    species, 
    breed, 
    dob, 
    gender, 
    weight, 
    notes, 
    age, 
    health_status, 
    purchase_price, 
    sold_price, 
    quantity, 
    created_at: createdAt, 
    updated_at: updatedAt 
  };
};

export const updateAnimal = async (id, animalData) => {
  const {
    name,
    species,
    breed,
    dob,
    gender,
    weight,
    notes,
    health_status,  // health_status is now a required field
    purchase_price,
    sold_price,
    quantity
  } = animalData;

  const age = calculateAge(dob);  // Calculate age from dob
  const updatedAt = new Date();

  await query(
    `UPDATE Animals 
     SET name = ?, species = ?, breed = ?, dob = ?, gender = ?, weight = ?, notes = ?, age = ?, health_status = ?, 
         purchase_price = ?, sold_price = ?, quantity = ?, updatedAt = ?
     WHERE id = ?`,
    [name, species, breed, dob, gender, weight, notes, age, health_status, purchase_price, sold_price, quantity, updatedAt, id]
  );

  // Return the updated animal data including age and health_status
  return { 
    id, 
    name, 
    species, 
    breed, 
    dob, 
    gender, 
    weight, 
    notes, 
    age, 
    health_status, 
    purchase_price, 
    sold_price, 
    quantity, 
    updated_at: updatedAt 
  };
};

export const deleteAnimal = async (id) => {
  await query('DELETE FROM Animals WHERE id = ?', [id]);
  return { success: true, message: `Animal with id ${id} deleted.` };
};

export const getAnimalCount = async () => {
  const result = await query('SELECT COUNT(*) as count FROM Animals');
  return result[0].count;
};
