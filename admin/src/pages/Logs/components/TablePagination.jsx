// Import dependencies
import React from "react";
import PropTypes from "prop-types";
import { Box, Flex } from "@strapi/design-system";
import { PageSizeURLQuery, PaginationURLQuery } from "@strapi/helper-plugin";

// Define the TablePagination component
function TablePagination({ pagination }) {
  return (
    <Box paddingTop={4}>
      <Flex alignItems="flex-end" justifyContent="space-between">
        <PageSizeURLQuery trackedEvent="willChangeNumberOfEntriesPerPage" />
        <PaginationURLQuery pagination={pagination} />
      </Flex>
    </Box>
  );
}

// Define default props
TablePagination.defaultProps = {
  pagination: {
    pageCount: 0,
    pageSize: 10,
    total: 0,
  },
};

// Define prop types
TablePagination.propTypes = {
  pagination: PropTypes.shape({
    page: PropTypes.number,
    pageCount: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
  }),
};

// Export the TablePagination component as default
export default TablePagination;
