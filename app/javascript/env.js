'use strict';

const SERVER_DOMAIN = process.env.API_DOMAIN;
const ENV = process.env.RAILS_ENV;

module.exports = {
  environment: ENV,
  serverDomain: SERVER_DOMAIN,
};
