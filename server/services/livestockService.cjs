const { Livestock, Variant } = require('../models'); // Adjust the import if you're using Sequelize models

module.exports = {
  async getAllLivestock() {
    return await Livestock.findAll({
      include: [{ model: Variant }],
      order: [['createdAt', 'DESC']]
    });
  },

  async getLivestockById(id) {
    return await Livestock.findByPk(id, {
      include: [{ model: Variant }]
    });
  },

  async createLivestock(data) {
    return await Livestock.create(data);
  },

  async updateLivestock(id, data) {
    const livestock = await Livestock.findByPk(id);
    if (!livestock) throw new Error('Livestock not found');
    return await livestock.update(data);
  },

  async deleteLivestock(id) {
    const livestock = await Livestock.findByPk(id);
    if (!livestock) throw new Error('Livestock not found');
    await Variant.destroy({ where: { livestockId: id } }); // cleanup
    return await livestock.destroy();
  }
};
