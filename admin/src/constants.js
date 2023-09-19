import pluginId from "./utils/pluginId";

const PERMISSIONS = {
  readSettings: [
    { action: `plugin::${pluginId}.settings.read`, subject: null },
  ],
  updateSettings: [
    { action: `plugin::${pluginId}.settings.update`, subject: null },
  ],
  readLogs: [{ action: `plugin::${pluginId}.read`, subject: null }],
};

export default PERMISSIONS;
