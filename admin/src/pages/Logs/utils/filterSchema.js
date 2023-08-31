"use strict";

import { useIntl } from "react-intl";

import getTrad from "../../../utils/getTrad";

const filterSchema = () => {
  const { formatMessage } = useIntl();

  return [
    {
      name: "id",
      metadatas: {
        label: formatMessage({
          id: getTrad("content.id"),
          defaultMessage: "ID",
        }),
      },
      fieldSchema: { type: "number" },
    },
    {
      name: "createdAt",
      metadatas: {
        label: formatMessage({
          id: getTrad("content.createdat"),
          defaultMessage: "Date",
        }),
      },
      fieldSchema: { type: "datetime" },
    },
    {
      name: "User",
      metadatas: {
        label: formatMessage({
          id: getTrad("content.user"),
          defaultMessage: "User",
        }),
      },
      fieldSchema: { type: "string" },
    },
    {
      name: "IP-Address",
      metadatas: {
        label: formatMessage({
          id: getTrad("content.ip-address"),
          defaultMessage: "IP Address",
        }),
      },
      fieldSchema: { type: "string" },
    },
    {
      name: "URL",
      metadatas: {
        label: formatMessage({
          id: getTrad("content.url"),
          defaultMessage: "URL",
        }),
      },
      fieldSchema: { type: "string" },
    },
    {
      name: "HTTP-Method",
      metadatas: {
        label: formatMessage({
          id: getTrad("content.http-method"),
          defaultMessage: "HTTP Method",
        }),
      },
      fieldSchema: { type: "string" },
    },
    {
      name: "HTTP-Status",
      metadatas: {
        label: formatMessage({
          id: getTrad("content.http-status"),
          defaultMessage: "HTTP Status",
        }),
      },
      fieldSchema: { type: "string" },
    },
    {
      name: "Request-Body",
      metadatas: {
        label: formatMessage({
          id: getTrad("content.request-body"),
          defaultMessage: "Request Body",
        }),
      },
      fieldSchema: { type: "json" },
    },
    {
      name: "Response-Body",
      metadatas: {
        label: formatMessage({
          id: getTrad("content.response-body"),
          defaultMessage: "Response Body",
        }),
      },
      fieldSchema: { type: "json" },
    },
  ];
};

export default filterSchema;
