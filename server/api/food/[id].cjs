const { db } = require('@/utils/db.js');
const foodService = require('@/services/foodService.cjs');

// GET specific food by ID
const getFoodById = async (req, res) => {
  const { id } = req.params;

  try {
    const food = await foodService.getFoodById(id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.status(200).json(food);
  } catch (error) {
    console.error('Error fetching food details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT update a specific food by ID
const updateFood = async (req, res) => {
  const { id } = req.params;
  const { name, purchase_unit, assigned_batch, description } = req.body;

  try {
    const food = await foodService.getFoodById(id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    const updatedFood = await foodService.updateFood(id, name, purchase_unit, assigned_batch, description);
    res.status(200).json(updatedFood);
  } catch (error) {
    console.error('Error updating food item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE a specific food by ID
const deleteFood = async (req, res) => {
  const { id } = req.params;

  try {
    const food = await foodService.getFoodById(id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    await foodService.deleteFood(id);
    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (error) {
    console.error('Error deleting food item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getFoodById,
  updateFood,
  deleteFood,
};
