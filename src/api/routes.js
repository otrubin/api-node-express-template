module.exports = (app, auth) => {
  require('./components/auth/routes.auth')(app, auth);
  require('./components/user/routes.user')(app, auth);
  require('./components/passwordReset/routes.passwordReset')(app, auth);
  require('./components/emailVerify/routes.emailVerify')(app, auth);
  require('./components/tag/routes.tag')(app, auth);
};
