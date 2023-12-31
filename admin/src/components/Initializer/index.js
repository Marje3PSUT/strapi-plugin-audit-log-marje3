/**
 *
 * Initializer
 *
 */

import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import pluginId from "../../utils/pluginId";

function Initializer({ setPlugin }) {
  const ref = useRef();
  ref.current = setPlugin;

  useEffect(() => {
    ref.current(pluginId);
  }, []);

  return null;
}

Initializer.propTypes = {
  setPlugin: PropTypes.func.isRequired,
};

export default Initializer;
