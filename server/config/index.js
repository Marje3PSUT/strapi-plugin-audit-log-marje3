const configSchema = require("./configSchema");

module.exports = {
  default: {},
  async validator(config) {
    await configSchema.validate(config);
  },
};
