const pluginId = require("../utils/pluginId");

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/logs",
      handler: "log.getLogs",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [`plugin::${pluginId}.read`],
            },
          },
        ],
      },
    },
  ],
};
