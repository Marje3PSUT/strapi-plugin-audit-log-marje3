const pluginId = require("../utils/pluginId");

module.exports = ({ strapi }) => ({
  findPage(query) {
    return strapi.entityService.findPage(`plugin::${pluginId}.log`, query);
  },
});
