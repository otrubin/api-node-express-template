const passport = require("passport");
const passportJWT = require("passport-jwt");
const userService = require("../services/user.service");
const responseHelper = require('../../helpers/response.helper');

function initPassport(app) {
  app.use(passport.initialize()); //!
  // ExtractJwt to help extract the token
  const ExtractJwt = passportJWT.ExtractJwt;
  // JwtStrategy which is the strategy for the authentication
  const JwtStrategy = passportJWT.Strategy;
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.AUTH_JWT_SECRET_KEY,
  };
  // lets create our strategy for web token
  const strategy = new JwtStrategy(
    jwtOptions,
    async function (jwt_payload, next) {
      console.log("payload received", jwt_payload); //!
      let user = await userService.getUserFromId(jwt_payload.id);
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    }
  );
  // use the strategy
  passport.use(strategy);
}

/**
 * Возвращает массв middleware, первый из которых passport.authenticate
 * вторым проверка на то чтобы email был верифицированным
 * поле options.isEmailVerified - указывает должен быть email верифицированным или нет
 * если email должен быть верифицированным, а он для конкретного пользователя НЕ верифицирован
 * возвращается ошибка (400) "auth_email_not_verified"
 * @param {Object} options
 */
function authentication(options = {}) {
  return [
    passport.authenticate('jwt', { session: false }),
    function(req, res, next) {
      if(options.isEmailVerified) { //если e-mail должен быть верифицирован
        if(!req.user.emailVerify) {
          return res.status(400).send(
            responseHelper.makeErrorObject("auth_email_not_verified")
          );
        }
      }
      next();
    }
  ];
}

module.exports = function (app) {
  initPassport(app);
  return {
    passport,
    authentication,
  };
};
