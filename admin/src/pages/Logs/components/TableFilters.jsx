import React, { useState, useRef } from "react";
import { useIntl } from "react-intl";

import PropTypes from "prop-types";

import { Filter } from "@strapi/icons";
import {
  FilterPopoverURLQuery,
  FilterListURLQuery,
} from "@strapi/helper-plugin";
import { Button, Box } from "@strapi/design-system";

import getTrad from "../../../utils/getTrad";

// Define the TableFilters component
function TableFilters({ displayedFilters }) {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef();
  const { formatMessage } = useIntl();

  const handleToggle = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      <Box paddingTop={1} paddingBottom={1}>
        <Button
          variant="tertiary"
          ref={buttonRef}
          startIcon={<Filter />}
          onClick={handleToggle}
          size="S"
        >
          {formatMessage({
            id: getTrad("content.filter.label"),
            defaultMessage: "Filters",
          })}
        </Button>

        {isVisible && (
          <FilterPopoverURLQuery
            displayedFilters={displayedFilters}
            isVisible={isVisible}
            onToggle={handleToggle}
            source={buttonRef}
          />
        )}
      </Box>

      <FilterListURLQuery filtersSchema={displayedFilters} />
    </>
  );
}

// PropTypes for component props
TableFilters.propTypes = {
  displayedFilters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      metadatas: PropTypes.shape({ label: PropTypes.string }),
      fieldSchema: PropTypes.shape({ type: PropTypes.string }),
    }),
  ).isRequired,
};

// Export the TableFilters component as default
export default TableFilters;
