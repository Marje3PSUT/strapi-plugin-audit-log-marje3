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
      name: "user",
      metadatas: {
        label: formatMessage({
          id: getTrad("content.user"),
          defaultMessage: "User",
        }),
      },
      fieldSchema: { type: "string" },
    },
    {
      name: "ip_address",
      metadatas: {
        label: formatMessage({
          id: getTrad("content.ip_address"),
          defaultMessage: "IP Address",
        }),
      },
      fieldSchema: { type: "string" },
    },
    {
      name: "url",
      metadatas: {
        label: formatMessage({
          id: getTrad("content.url"),
          defaultMessage: "URL",
        }),
      },
      fieldSchema: { type: "string" },
    },
    {
      name: "http_method",
      metadatas: {
        label: formatMessage({
          id: getTrad("content.http_method"),
          defaultMessage: "HTTP Method",
        }),
      },
      fieldSchema: { type: "string" },
    },
    {
      name: "http_status",
      metadatas: {
        label: formatMessage({
          id: getTrad("content.http_status"),
          defaultMessage: "HTTP Status",
        }),
      },
      fieldSchema: { type: "string" },
    },
    {
      name: "request_body",
      metadatas: {
        label: formatMessage({
          id: getTrad("content.request_body"),
          defaultMessage: "Request Body",
        }),
      },
      fieldSchema: { type: "json" },
    },
    {
      name: "response_body",
      metadatas: {
        label: formatMessage({
          id: getTrad("content.response_body"),
          defaultMessage: "Response Body",
        }),
      },
      fieldSchema: { type: "json" },
    },
  ];
};

export default filterSchema;
