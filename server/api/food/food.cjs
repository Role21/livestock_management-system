const { db } = require('@/utils/db.cjs');
const foodService = require('@/services/foodService.cjs');

// GET all food items
const getAllFood = async (req, res) => {
  try {
    const foods = await foodService.getAllFood();
    res.status(200).json(foods);
  } catch (error) {
    console.error('Error fetching food items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// POST create a new food item
const createFood = async (req, res) => {
  const { name, purchase_unit, assigned_batch, description } = req.body;

  if (!name || !purchase_unit) {
    return res.status(400).json({ message: 'Name and purchase unit are required' });
  }

  try {
    const newFood = await foodService.createFood(name, purchase_unit, assigned_batch, description);
    res.status(201).json(newFood);
  } catch (error) {
    console.error('Error creating food item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllFood,
  createFood,
};
