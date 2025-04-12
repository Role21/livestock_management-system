const { User } = require('../models'); // Adjust to your model path

module.exports = {
  async getAllProfiles() {
    return await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });
  },

  async getProfileById(id) {
    return await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
  },

  async updateProfile(id, data) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');

    // Only allow safe fields to be updated
    const { name, email, phone, address } = data;
    return await user.update({ name, email, phone, address });
  }
};
