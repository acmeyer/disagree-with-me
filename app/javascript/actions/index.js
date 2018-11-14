const userActions = require('./user');
const postActions = require('./posts');
const responseActions = require('./responses');
const loginActions = require('./login');
const composeActions = require('./compose');
const conversationActions = require('./conversation');
const reportingActions = require('./reporting');
const searchActions = require('./search');
const notificationActions = require('./notifications');
const topicActions = require('./topics');

module.exports = {
  ...userActions,
  ...postActions,
  ...responseActions,
  ...loginActions,
  ...composeActions,
  ...conversationActions,
  ...reportingActions,
  ...searchActions,
  ...notificationActions,
  ...topicActions,
};