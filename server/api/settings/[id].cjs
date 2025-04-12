// server/api/settings/[id].cjs

const { defineEventHandler, getRouterParam, readBody } = require('h3');
const settingsService = require('../../services/settingsService.cjs');

module.exports = defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const { method } = event.node.req;

  if (method === 'GET') {
    try {
      const setting = await settingsService.getSettingById(id);
      if (!setting) return { error: 'Setting not found' };
      return setting;
    } catch (error) {
      return { error: error.message };
    }
  }

  if (method === 'PUT') {
    const body = await readBody(event);
    const { key, value } = body;

    if (!key || !value) {
      return { error: 'Both key and value are required.' };
    }

    try {
      const result = await settingsService.updateSetting(id, { key, value });
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  if (method === 'DELETE') {
    try {
      const result = await settingsService.deleteSetting(id);
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  return { error: 'Method not allowed' };
});
