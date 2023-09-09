"use strict";

import React from "react";
import PropTypes from "prop-types";

import { Button } from "@strapi/design-system";

const downloadFile = (data, filename) => {
  const jsonBlob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(jsonBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const ExportBtn = ({ list }) => {
  const jsonData = JSON.stringify(list);
  return (
    <Button onClick={() => downloadFile(jsonData, "logs.json")}>
      Export Logs
    </Button>
  );
};

// PropTypes for component props
ExportBtn.propTypes = {
  list: PropTypes.array.isRequired,
};
export default ExportBtn;
