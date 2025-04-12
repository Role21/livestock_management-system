const bcrypt = require('bcryptjs');
const db = require('../utils/db.cjs'); // This is your Sequelize instance or DB connector

// const { User } = require('../models'); // Make sure your models/index.js exports User properly

// Authenticate user during login
exports.authenticateUser = async function authenticateUser(email, password) {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};

// Create a new user during registration
exports.registerUser = async function registerUser({ name, email, password }) {
  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return { error: 'Email already registered' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user', // or whatever default role you prefer
    });

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };
  } catch (error) {
    console.error('Registration error:', error);
    return { error: 'Registration failed' };
  }
};
