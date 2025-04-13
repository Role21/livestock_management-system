const { db } = require('@/utils/db.js');

// GET all food items
const getAllFood = async () => {
  return await db.Food.findAll();
};

// CREATE a new food item
const createFood = async (name, purchase_unit, assigned_batch, description) => {
  return await db.Food.create({
    name,
    purchase_unit,
    assigned_batch,
    description,
  });
};

// GET specific food by ID
const getFoodById = async (id) => {
  return await db.Food.findOne({
    where: { id },
  });
};

// UPDATE a specific food by ID
const updateFood = async (id, name, purchase_unit, assigned_batch, description) => {
  const food = await getFoodById(id);
  if (!food) {
    throw new Error('Food not found');
  }

  food.name = name || food.name;
  food.purchase_unit = purchase_unit || food.purchase_unit;
  food.assigned_batch = assigned_batch || food.assigned_batch;
  food.description = description || food.description;

  await food.save();
  return food;
};

// DELETE a specific food by ID
const deleteFood = async (id) => {
  const food = await getFoodById(id);
  if (!food) {
    throw new Error('Food not found');
  }

  await food.destroy();
};

module.exports = {
  getAllFood,
  createFood,
  getFoodById,
  updateFood,
  deleteFood,
};
