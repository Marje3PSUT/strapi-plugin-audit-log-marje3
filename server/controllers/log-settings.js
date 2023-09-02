"use strict";

const { ValidationError } = require("@strapi/utils").errors;
const yup = require("yup");
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

module.exports = {
  async getSettings(ctx) {
    const settings = await strapi
      .store({ type: "plugin", name: pluginId, key: "log-settings" })
      .get();

    ctx.send({ settings });
  },

  async updateSettings(ctx) {
    if (await !schema.validate(ctx.request.body)) {
      throw new ValidationError("Request body is incorrect");
    }

    await strapi
      .store({ type: "plugin", name: pluginId, key: "log-settings" })
      .set({ value: ctx.request.body });

    strapi.plugin(pluginId).service("delete-log").deleteJob();

    ctx.send({ ok: true });
  },
};
