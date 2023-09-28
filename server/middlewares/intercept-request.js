const _ = require("lodash");
const pluginId = require("../utils/pluginId");

const getFilterResult = (filter, actualValue, checkFunction) => {
  let result = true;
  let check = (val, valToCheck) => val === valToCheck;
  if (checkFunction) check = checkFunction;
  if (filter) {
    if (filter.include) {
      result = filter.include.some((val) => check(val, actualValue));
    } else if (filter.exclude) {
      result = !filter.exclude.some((val) => check(val, actualValue));
    }
  }
  return result;
};

const replaceContents = (obj, excludedValues) =>
  _.mapValues(obj, (value, key) => {
    if (excludedValues.includes(key)) return "#_REDACTED_#";
    if (typeof value === "object")
      return replaceContents(value, excludedValues);
    return value;
  });

module.exports = ({ strapi }) => {
  strapi.server.use(async (ctx, next) => {
    await next();

    const config = strapi.config.get(`plugin.${pluginId}`);

    const endpoint = getFilterResult(
      config.filters.endpoint,
      ctx.url,
      (val, valToCheck) => valToCheck.startsWith(val),
    );
    const status = getFilterResult(config.filters.status, ctx.status);
    const method = getFilterResult(config.filters.method, ctx.method);

    if (endpoint && status && method) {
      let request = {};
      let response = {};

      if (ctx.request.body) {
        request = replaceContents(
          JSON.parse(JSON.stringify(ctx.request.body)),
          config.redactedValues,
        );
      }

      if (ctx.response.body) {
        response = replaceContents(
          JSON.parse(JSON.stringify(ctx.response.body)),
          config.redactedValues,
        );
      }

      const data = {
        user: ctx.state.user !== undefined ? ctx.state.user.email : "Anonymous",
        url: ctx.url,
        ip_address: ctx.ip,
        http_method: ctx.method,
        http_status: ctx.status,
        request_body: request,
        response_body: response,
      };

      strapi.entityService.create(`plugin::${pluginId}.log`, {
        data,
      });
    }
  });
};
