import React from "react";
import { useIntl } from "react-intl";

import { Flex, TextInput, JSONInput } from "@strapi/design-system";

import getTrad from "../../../utils/getTrad";

function LogModal({ entry }) {
  const { formatMessage } = useIntl();

  return (
    <Flex direction="column" alignItems="stretch" gap={2}>
      <TextInput
        label={formatMessage({
          id: getTrad("content.id"),
          defaultMessage: "User",
        })}
        value={entry.user}
        disabled
      />
      <TextInput
        label={formatMessage({
          id: getTrad("content.createdat"),
          defaultMessage: "Date",
        })}
        value={new Date(entry.createdAt).toUTCString()}
        disabled
      />
      <TextInput
        label={formatMessage({
          id: getTrad("content.url"),
          defaultMessage: "URL",
        })}
        value={entry.url}
        disabled
      />
      <TextInput
        label={formatMessage({
          id: getTrad("content.ip_address"),
          defaultMessage: "IP Address",
        })}
        value={entry.ip_address}
        disabled
      />
      <TextInput
        label={formatMessage({
          id: getTrad("content.http_method"),
          defaultMessage: "HTTP Method",
        })}
        value={entry.http_method}
        disabled
      />
      <TextInput
        label={formatMessage({
          id: getTrad("content.http_status"),
          defaultMessage: "HTTP Status",
        })}
        value={entry.http_status}
        disabled
      />
      <JSONInput
        label={formatMessage({
          id: getTrad("content.request_body"),
          defaultMessage: "Request Body",
        })}
        value={JSON.stringify(entry.request_body, null, 2)}
        disabled
      />
      <JSONInput
        label={formatMessage({
          id: getTrad("content.response_body"),
          defaultMessage: "Response Body",
        })}
        value={JSON.stringify(entry.response_body, null, 2)}
        disabled
      />
    </Flex>
  );
}

export default LogModal;
