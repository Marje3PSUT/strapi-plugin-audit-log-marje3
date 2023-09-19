import { getFetchClient } from "@strapi/helper-plugin";
import pluginId from "../../../utils/pluginId";

const fetchLogSettings = async () => {
  const { get } = getFetchClient();
  const { data } = await get(`/${pluginId}/settings`);
  return data.settings;
};

const putLogSettings = async (body) => {
  const { put } = getFetchClient();
  await put(`/${pluginId}/settings`, body);
};

export { fetchLogSettings, putLogSettings };
