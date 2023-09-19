const pluginId = require("./utils/pluginId");

const RBAC_ACTIONS = [
  {
    section: "plugins",
    displayName: "Read settings",
    uid: "settings.read",
    pluginName: pluginId,
    subCategory: "settings",
  },
  {
    section: "plugins",
    displayName: "Update settings",
    uid: "settings.update",
    pluginName: pluginId,
    subCategory: "settings",
  },
  {
    section: "plugins",
    displayName: "Access logs",
    uid: "read",
    pluginName: pluginId,
  },
];

const initLogSettings = async (pluginStore) => {
  if (!(await pluginStore.get({ key: "log-settings" }))) {
    const value = {
      enabled: true,
      frequency: "logAge",
      logAge: {
        value: 2,
        interval: "week",
      },
      logCount: {
        value: 5000,
      },
    };
    pluginStore.set({ key: "log-settings", value });
  }
};

module.exports = async ({ strapi }) => {
  const pluginStore = strapi.store({ type: "plugin", name: pluginId });

  await initLogSettings(pluginStore);

  await strapi.admin.services.permission.actionProvider.registerMany(
    RBAC_ACTIONS,
  );

  await strapi.cron.add({
    deleteJob: {
      task: ({ strapi }) => {
        strapi.plugin(pluginId).service("delete-log").deleteJob();
      },
      options: {
        rule: "0 0 * * *",
      },
    },
  });
};
