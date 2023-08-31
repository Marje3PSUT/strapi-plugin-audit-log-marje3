"use strict";

module.exports = {
  kind: "collectionType",
  collectionName: "log",
  info: {
    singularName: "log",
    pluralName: "logs",
    displayName: "Logs",
  },
  options: {
    draftAndPublish: false,
    comment: "",
  },
  pluginOptions: {
    "content-manager": {
      visible: false,
    },
    "content-type-builder": {
      visible: false,
    },
  },
  attributes: {
    User: {
      type: "text",
    },
    URL: {
      type: "text",
    },
    "IP-Address": {
      type: "text",
    },
    "HTTP-Method": {
      type: "string",
    },
    "HTTP-Status": {
      type: "integer",
    },
    "Request-Body": {
      type: "json",
    },
    "Response-Body": {
      type: "json",
    },
  },
};
