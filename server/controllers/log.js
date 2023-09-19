const { defaultsDeep, isEqual } = require("lodash/fp");
const { stringify } = require("qs");
const pluginId = require("../utils/pluginId");

module.exports = ({ strapi }) => ({
  async getLogs(ctx) {
    const {
      state: { userAbility },
    } = ctx;

    const pm = strapi.admin.services.permission.createPermissionsManager({
      ability: userAbility,
      action: `plugin::${pluginId}.read`,
      model: `plugin::${pluginId}.log`,
    });

    if (!pm.isAllowed) {
      return ctx.forbidden();
    }

    const defaults = {
      page: 1,
      pageSize: 10,
      sort: "createdAt:DESC",
    };

    const mergeQuery = defaultsDeep(defaults, ctx.query);

    if (!isEqual(ctx.query, mergeQuery)) {
      ctx.redirect(
        `/${pluginId}/logs?${stringify(defaults, { encode: false })}`,
      );
      return;
    }

    const pmQuery = pm.addPermissionsQueryTo(mergeQuery);
    const query = await pm.sanitizeQuery(pmQuery);

    const { results: entries, pagination } = await strapi
      .plugin(pluginId)
      .service("log")
      .findPage(query);

    const sanitizedEntries = await pm.sanitizeOutput(entries);

    return { results: sanitizedEntries, pagination };
  },
});
