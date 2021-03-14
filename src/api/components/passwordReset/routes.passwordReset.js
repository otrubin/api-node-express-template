const controller = require('./controller.passwordReset');

module.exports = function(app, auth) {
  app.put("/api/password/reset", controller.passwordReset);
};