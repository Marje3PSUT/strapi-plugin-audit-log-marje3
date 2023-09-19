const registerInterceptRequestMiddleware = require("./middlewares/intercept-request");

module.exports = ({ strapi }) => {
  registerInterceptRequestMiddleware({ strapi });
};
