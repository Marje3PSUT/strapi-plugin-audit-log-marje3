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
    user: {
      type: "text",
    },
    url: {
      type: "text",
    },
    ip_address: {
      type: "text",
    },
    http_method: {
      type: "string",
    },
    http_status: {
      type: "integer",
    },
    request_body: {
      type: "json",
    },
    response_body: {
      type: "json",
    },
  },
};
