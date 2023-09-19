const LogService = require("./log");
const DeleteLogService = require("./delete-log");

module.exports = {
  log: LogService,
  "delete-log": DeleteLogService,
};
