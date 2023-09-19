const { ValidationError } = require("@strapi/utils").errors;
const yup = require("yup");
const _ = require("lodash");
const pluginId = require("../utils/pluginId");

const schema = yup.object().shape({
  enabled: yup.boolean(),
  frequency: yup.string().oneOf(["logAge", "logCount"]),
  logAge: yup.object().shape({
    value: yup.number().min(1),
    interval: yup.string().oneOf(["day", "week", "month", "year"]),
  }),
  logCount: yup.object().shape({
    value: yup.number().min(1),
  }),
});

const defaults = {
  enabled: false,
  frequency: "logAge",
  logAge: {
    value: 2,
    interval: "week",
  },
  logCount: {
    value: 1000,
  },
};

module.exports = ({ strapi }) => ({
  async getSettings(ctx) {
    let settings = await strapi.config.get(`plugin.${pluginId}`).deletion;

    if (!settings) {
      ctx.send({ settings: defaults });
      return;
    }

    settings = {
      enabled:
        typeof settings.enabled !== "undefined" ? settings.enabled : false,
      frequency: settings.frequency ? settings.frequency : "logAge",
      logAge: {
        value: settings?.options.value ? settings.options.value : 2,
        interval: settings?.options.interval
          ? settings.options.interval
          : "week",
      },
      logCount: {
        value: settings?.options.value ? settings.options.value : 2,
      },
    };

    ctx.send({ settings });
  },

  async updateSettings(ctx) {
    let { body } = ctx.request;

    if (await !schema.validate(body)) {
      throw new ValidationError("Request body is incorrect");
    }

    const options = {};

    if (body.frequency === "logAge") {
      options.value = body.logAge.value;
      options.interval = body.logAge.value;
    } else {
      options.value = body.logCount.value;
    }

    body = {
      enabled: body.enabled,
      frequency: body.frequency,
      options,
    };

    const settings = await strapi.config.get(`plugin.${pluginId}`);
    settings.deletion = body;
    await strapi.config.set(`plugin.${pluginId}`, settings);

    strapi.plugin(pluginId).service("delete-log").deleteJob();

    ctx.send({ ok: true });
  },
});
