const { Category } = require('@/utils/db.js');  // Adjust the import path to your actual model

// GET a specific category by ID
exports.get = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findOne({ where: { id } });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// PUT (update) a specific category by ID
exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const category = await Category.findOne({ where: { id } });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.name = name || category.name;
    category.description = description || category.description;

    await category.save();

    res.status(200).json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// DELETE a specific category by ID
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findOne({ where: { id } });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.destroy();

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
