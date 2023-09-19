const pluginId = require("../utils/pluginId");

const checkLogAge = async (logAge, { strapi }) => {
  let constant = 1;
  switch (logAge.interval) {
    case "day":
      constant = 8.64e7;
      break;
    case "week":
      constant = 6.048e8;
      break;
    case "month":
      constant = 2.628e9;
      break;
    case "year":
      constant = 3.154e10;
      break;
    default:
      throw Error("Log Age incorrent");
  }

  await strapi.db.query(`plugin::${pluginId}.log`).deleteMany({
    where: {
      createdAt: {
        $lte: +new Date() - logAge.value * constant,
      },
    },
  });
};

const checkLogCount = async (logCount, { strapi }) => {
  const records = await strapi.db.query(`plugin::${pluginId}.log`).findMany({
    select: ["id"],
    orderBy: { createdAt: "DESC" },
    limit: logCount.value,
  });

  const ids = records.map((obj) => obj.id);

  await strapi.db.query(`plugin::${pluginId}.log`).deleteMany({
    where: {
      id: {
        $not: {
          $in: ids,
        },
      },
    },
  });
};

module.exports = ({ strapi }) => ({
  async deleteJob() {
    const settings = await strapi
      .store({ type: "plugin", name: pluginId })
      .get({ key: "log-settings" });

    if (!settings.enabled) return;

    switch (settings.frequency) {
      case "logAge":
        await checkLogAge(settings.logAge, { strapi });
        break;
      case "logCount":
        await checkLogCount(settings.logCount, { strapi });
        break;
      default:
        throw Error("Frequency value is incorrent");
    }
  },
});
