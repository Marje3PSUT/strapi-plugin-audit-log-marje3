import React from "react";

import { Tr, Td, Typography } from "@strapi/design-system";

function LogRow({ entry, visibleColumns, onClickHandler, style }) {
  return (
    <Tr key={entry.id} onClick={() => onClickHandler(entry)} style={style}>
      {visibleColumns
        .filter((column) => column.visible)
        .map((column) => (
          <Td>
            <Typography textColor="neutral800" fontWeight="bold" ellipsis>
              {column.id === "createdAt"
                ? new Date(entry[column.id]).toUTCString()
                : entry[column.id]}
            </Typography>
          </Td>
        ))}
    </Tr>
  );
}

export default LogRow;
