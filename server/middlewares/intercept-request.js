"use strict";

const pluginId = require("../utils/pluginId");

const defaults = ["password", "token", "firstname", "lastname", "username"];

const replaceContents = (object, defaults) => {
  for (const key in object) {
    if (typeof object[key] === "object") {
      object[key] = replaceContents(object[key], defaults);
    } else if (defaults.indexOf(key) !== -1) {
      object[key] = "## REDACTED FOR SECURITY REASONS ##";
    }
  }
  return object;
};

module.exports = ({ strapi }) => {
  strapi.server.use(async (ctx, next) => {
    await next();

    let methods = ["POST", "PUT", "DELETE"];
    let excludeURLs = ["/admin/renew-token"];

    if (
      methods.some((method) => method === ctx.method) &&
      !excludeURLs.some((url) => url === ctx.url)
    ) {
      const request = replaceContents(
        JSON.parse(JSON.stringify(ctx.request.body)),
        defaults
      );
      const response = replaceContents(
        JSON.parse(JSON.stringify(ctx.response.body)),
        defaults
      );

      let data = {
        User: ctx.state.user !== undefined ? ctx.state.user.email : "Anonymous",
        URL: ctx.url,
        "IP-Address": ctx.ip,
        "HTTP-Method": ctx.method,
        "HTTP-Status": ctx.status,
        "Request-Body": request,
        "Response-Body": response,
      };

      strapi.entityService.create(`plugin::${pluginId}.log`, {
        data,
      });
    }
  });
};
