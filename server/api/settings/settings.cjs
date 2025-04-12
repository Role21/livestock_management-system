// server/api/settings.cjs

const { defineEventHandler, readBody } = require('h3');
const settingsService = require('../../services/settingsService.cjs');

module.exports = defineEventHandler(async (event) => {
  const { method } = event.node.req;

  if (method === 'GET') {
    try {
      const settings = await settingsService.getAllSettings();
      return settings;
    } catch (error) {
      return { error: error.message };
    }
  }

  if (method === 'POST') {
    const body = await readBody(event);
    const { key, value } = body;

    if (!key || !value) {
      return { error: 'Both key and value are required.' };
    }

    try {
      const result = await settingsService.createSetting({ key, value });
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  return { error: 'Method not allowed' };
});
