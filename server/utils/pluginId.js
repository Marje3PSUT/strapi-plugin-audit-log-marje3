"use strict";

const pluginPkg = require("../../package.json");

const pluginId = pluginPkg.strapi.name.replace(
  /^(@[^-,.][\w,-]+\/|strapi-)plugin-/i,
  ""
);

console.log(pluginId);

module.exports = pluginId;
