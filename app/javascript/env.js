'use strict';

const SERVER_DOMAIN = process.env.API_DOMAIN;
const DOMAIN_NAME = process.env.DOMAIN_NAME;
const ENV = process.env.RAILS_ENV;
const ALGOLIASEARCH_APPLICATION_ID = process.env.ALGOLIASEARCH_APPLICATION_ID;
const ALGOLIASEARCH_API_KEY_SEARCH = process.env.ALGOLIASEARCH_API_KEY_SEARCH;
const ALGOLIA_ENVIRONMENT = process.env.ALGOLIA_ENVIRONMENT;

module.exports = {
  environment: ENV,
  serverDomain: SERVER_DOMAIN,
  domain: DOMAIN_NAME,
  protocol: ENV === 'development' ? 'http://' : 'https://',
  algoliaAppId: ALGOLIASEARCH_APPLICATION_ID,
  algoliaSearchKey: ALGOLIASEARCH_API_KEY_SEARCH,
  algoliaEnv: ALGOLIA_ENVIRONMENT,
};
