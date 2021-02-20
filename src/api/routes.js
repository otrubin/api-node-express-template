module.exports = (app) => {
  require('./components/auth/routes.auth')(app);
  require('./components/user/routes.user')(app);
  require('./components/passwordReset/routes.passwordReset')(app);
};
