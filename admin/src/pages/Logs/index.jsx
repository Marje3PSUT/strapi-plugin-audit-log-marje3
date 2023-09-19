import React, { useState } from "react";
import { useQuery } from "react-query";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";

import _ from "lodash";

import {
  Main,
  HeaderLayout,
  ContentLayout,
  EmptyStateLayout,
  useNotifyAT,
  Table,
  Thead,
  Tr,
  Th,
  Typography,
  ActionLayout,
} from "@strapi/design-system";
import {
  SettingsPageTitle,
  CheckPagePermissions,
  useNotification,
  useFocusWhenNavigate,
  LoadingIndicatorPage,
  useQueryParams,
  SearchURLQuery,
} from "@strapi/helper-plugin";

import PERMISSIONS from "../../constants";
import fetchLogs from "./utils/api";
import getTrad from "../../utils/getTrad";
import InteractiveLogRows from "./components/InteractiveLogRows";
import TablePagination from "./components/TablePagination";
import filterSchema from "./utils/filterSchema";
import TableFilters from "./components/TableFilters";

function ProtectedLogs() {
  return (
    <CheckPagePermissions permissions={PERMISSIONS.readLogs}>
      <Logs />
    </CheckPagePermissions>
  );
}

function Logs() {
  const initialColumns = [
    "id",
    "user",
    "ip_address",
    "url",
    "http_method",
    "http_status",
    "createdAt",
  ]; // TODO Add menu to hide columns

  const [{ query: queryParams }] = useQueryParams();
  const searchQuery = queryParams?._q || "";
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true); // Used to workaround axios issue #1 (README.md)
  const { formatMessage } = useIntl(); // For getting locales
  const toggleNotification = useNotification(); // For error saving the form
  const { notifyStatus } = useNotifyAT(); // For saving the form
  // const { lockApp, unlockApp } = useOverlayBlocker(); // Locking form while submitting
  useFocusWhenNavigate(); // \_[._.]_/ No clue what this does, but every other plugin has it

  const [entries, setEntries] = useState({
    results: [],
    pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
  });
  const [visibleColumns, setVisibleColumns] = useState(
    initialColumns.map((id) => ({
      id,
      visible: true,
    })),
  );

  const emptyLayoutContent = {
    logs: {
      id: getTrad("content.empty"),
      defaultMessage: "You don't have any logs yet.",
    },
    search: {
      id: getTrad("content.empty.search"),
      defaultMessage: "No logs match the search.",
    },
  };

  useQuery(["logs", queryParams], () => {
    setIsLoading(true);
    fetchLogs(queryParams)
      .then((res) => {
        notifyStatus(
          formatMessage({
            id: getTrad("fetch.success"),
            defaultMessage: "Logs have been loaded.",
          }),
        );
        if (res.location) {
          history.replace(res.location);
        } else {
          setEntries(res.result);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        toggleNotification({
          type: "warning",
          message: formatMessage({
            id: getTrad("fetch.error"),
            defaultMessage: "Failed to retrieve the logs.",
          }),
        });
        console.log(`error${e}`);
      });
  });

  if (isLoading) {
    return (
      <Main labelledBy="title" aria-busy="true">
        <SettingsPageTitle>
          {formatMessage({
            id: getTrad("title"),
            defaultMessage: "Audit Logs",
          })}
        </SettingsPageTitle>
        <HeaderLayout
          title={formatMessage({
            id: getTrad("title"),
            defaultMessage: "Audit Logs",
          })}
          subtitle={`0 ${formatMessage({
            id: getTrad("subtitle"),
            defaultMessage: "entries found",
          })}`}
        />
        <ContentLayout>
          <LoadingIndicatorPage />
        </ContentLayout>
      </Main>
    );
  }

  return (
    <Main labelledBy="title">
      <SettingsPageTitle>
        {formatMessage({
          id: getTrad("title"),
          defaultMessage: "Audit Logs",
        })}
      </SettingsPageTitle>
      <HeaderLayout
        title={formatMessage({
          id: getTrad("title"),
          defaultMessage: "Audit Logs",
        })}
        subtitle={`${entries.pagination.total} ${formatMessage({
          id: getTrad("subtitle"),
          defaultMessage: "entries found",
        })}`}
      />
      {_.isEmpty(entries) ? (
        <EmptyStateLayout content={formatMessage(emptyLayoutContent.logs)} />
      ) : (
        <>
          <ActionLayout
            startActions={
              <>
                <SearchURLQuery
                  label={formatMessage({
                    id: getTrad("content.search.label"),
                    defaultMessage: "Search logs",
                  })}
                />
                <TableFilters displayedFilters={filterSchema()} />
              </>
            }
          />
          <ContentLayout>
            <Table
              colCount={
                visibleColumns.filter((column) => column.visible).length
              }
              rowCount={entries.pagination.total}
            >
              <Thead>
                <Tr>
                  {visibleColumns.map((column) => (
                    <Th>
                      <Typography variant="sigma">
                        {formatMessage({
                          id: getTrad(`content.${column.id.toLowerCase()}`),
                          defaultMessage: column.id.replace("_", " "),
                        })}
                      </Typography>
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <InteractiveLogRows
                entries={entries}
                visibleColumns={visibleColumns}
              />
            </Table>
            <TablePagination
              pagination={{ pageCount: entries.pagination?.pageCount || 1 }}
            />
          </ContentLayout>
        </>
      )}
    </Main>
  );
}

export default ProtectedLogs;
