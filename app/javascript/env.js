'use strict';

const SERVER_DOMAIN = process.env.API_DOMAIN;
const DOMAIN_NAME = process.env.DOMAIN_NAME;
const ENV = process.env.RAILS_ENV;
const FB_APP_ID = process.env.FB_APP_ID;

module.exports = {
  environment: ENV,
  serverDomain: SERVER_DOMAIN,
  domain: DOMAIN_NAME,
  protocol: ENV === 'development' ? 'http://' : 'https://',
  fbAppId: FB_APP_ID,
};
