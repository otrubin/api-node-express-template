const config = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./components/user/model.user')(sequelize, Sequelize);
db.passwordReset = require('./components/passwordReset/model.passwordReset')(sequelize, Sequelize);



db.initial = async () => {
  if(process.env.NODE_ENV !== "development") {
    return;
  }
  const initService = require('./services/init.service');
  await initService.initUserTable(db);
}

module.exports = db;