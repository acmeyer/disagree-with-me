const userActions = require('./user');
const postActions = require('./posts');
const responseActions = require('./responses');
const loginActions = require('./login');
const composeActions = require('./compose');
const conversationActions = require('./conversation');

module.exports = {
  ...userActions,
  ...postActions,
  ...responseActions,
  ...loginActions,
  ...composeActions,
  ...conversationActions,
};