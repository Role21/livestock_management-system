const { Category } = require('@/utils/db.cjs');  // Adjust the import path to your actual model

// GET all categories
exports.getAll = async (req, res) => {
  try {
    const categories = await Category.findAll();
    if (categories.length === 0) {
      return res.status(404).json({ message: 'No categories found' });
    }
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// POST a new category
exports.create = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Category name is required' });
  }

  try {
    const newCategory = await Category.create({
      name,
      description: description || '',  // Default to an empty string if no description
    });

    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
