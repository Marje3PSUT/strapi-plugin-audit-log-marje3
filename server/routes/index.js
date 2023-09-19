const LogRouter = require("./log");
const LogSettingsRouter = require("./log-settings");

module.exports = {
  log: LogRouter,
  "log-settings": LogSettingsRouter,
};
