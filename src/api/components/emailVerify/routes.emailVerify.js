const controller = require('./controller.emailVerify');

module.exports = function(app, auth) {
  app.put("/api/verify/email", controller.emailVerify);
};