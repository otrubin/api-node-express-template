const controller = require('./controller.passwordReset');

module.exports = function(app) {

  app.put("/api/password/reset", controller.passwordReset);
};