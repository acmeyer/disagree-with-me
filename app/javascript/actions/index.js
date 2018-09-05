const userActions = require('./user');
const postActions = require('./posts');
const responseActions = require('./responses');
const loginActions = require('./login');
const composeActions = require('./compose');

module.exports = {
  ...userActions,
  ...postActions,
  ...responseActions,
  ...loginActions,
  ...composeActions,
};