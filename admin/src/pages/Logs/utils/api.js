import { getFetchClient } from "@strapi/helper-plugin";
import { stringify } from "qs";

import pluginId from "../../../utils/pluginId";

const fetchLogs = async (queryParams) => {
  const { get } = getFetchClient();
  const result = await get(
    `/${pluginId}/logs${
      queryParams ? `?${stringify(queryParams, { encode: false })}` : ""
    }`,
  );
  const url = result.request.responseURL.match(
    `\\/(${pluginId})\\/logs(?:\\?[^#]*)?(?:#.*)?`,
  )[0];

  if (result.config.url !== url) {
    return {
      location: `/settings${url}`,
    };
  }
  return { result: result.data };
};

export default fetchLogs;
