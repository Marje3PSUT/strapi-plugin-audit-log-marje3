import React, { useState } from "react";
import { useIntl } from "react-intl";

import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  Typography,
} from "@strapi/design-system";

import LogRow from "./LogRow";
import LogModal from "./LogModal";
import getTrad from "../../../utils/getTrad";

function InteractiveLogRows({ entries, visibleColumns }) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState({});
  const { formatMessage } = useIntl();
  const onClickHandler = (entry) => {
    setSelectedEntry(entry);
    setIsVisible(true);
  };

  return (
    <>
      {entries.results.map((entry) => (
        <LogRow
          entry={entry}
          visibleColumns={visibleColumns}
          onClickHandler={onClickHandler}
          style={{
            cursor: "pointer",
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
          }}
        />
      ))}

      {isVisible && (
        <ModalLayout
          onClose={() => setIsVisible((prev) => !prev)}
          labelledBy="title"
        >
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              {formatMessage({
                id: getTrad("content.modal.title"),
                defaultMessage: "Log entry",
              })}
            </Typography>
          </ModalHeader>
          <ModalBody>
            <LogModal entry={selectedEntry} />
          </ModalBody>
        </ModalLayout>
      )}
    </>
  );
}

export default InteractiveLogRows;
