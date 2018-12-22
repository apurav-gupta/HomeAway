var userMutation = require('./user');
var postMutation = require('./post');

module.exports = {
  ...userMutation,
  ...postMutation
}
