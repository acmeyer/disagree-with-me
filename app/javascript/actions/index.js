const userActions = require('./user');
const postActions = require('./posts');
const responseActions = require('./responses');

module.exports = {
  ...userActions,
  ...postActions,
  ...responseActions,
};