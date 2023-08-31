"use strict";

import React from "react";
import { useIntl } from "react-intl";

import { Flex, TextInput, JSONInput } from "@strapi/design-system";

import getTrad from "../../../utils/getTrad";

const LogModal = ({ entry }) => {
  const { formatMessage } = useIntl();

  return (
    <Flex direction="column" alignItems="stretch" gap={2}>
      <TextInput
        label={formatMessage({
          id: getTrad("content.id"),
          defaultMessage: "User",
        })}
        value={entry.User}
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
        value={entry.URL}
        disabled
      />
      <TextInput
        label={formatMessage({
          id: getTrad("content.ip-address"),
          defaultMessage: "IP Address",
        })}
        value={entry["IP-Address"]}
        disabled
      />
      <TextInput
        label={formatMessage({
          id: getTrad("content.http-method"),
          defaultMessage: "HTTP Method",
        })}
        value={entry["HTTP-Method"]}
        disabled
      />
      <TextInput
        label={formatMessage({
          id: getTrad("content.http-status"),
          defaultMessage: "HTTP Status",
        })}
        value={entry["HTTP-Status"]}
        disabled
      />
      <JSONInput
        label={formatMessage({
          id: getTrad("content.request-body"),
          defaultMessage: "Request Body",
        })}
        value={JSON.stringify(entry["Request-Body"], null, 2)}
        disabled
      />
      <JSONInput
        label={formatMessage({
          id: getTrad("content.response-body"),
          defaultMessage: "Response Body",
        })}
        value={JSON.stringify(entry["Response-Body"], null, 2)}
        disabled
      />
    </Flex>
  );
};

export default LogModal;
