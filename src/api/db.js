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

db.initial = async () => {
  const bcrypt = require('bcryptjs');
  const bcrypt_salt = bcrypt.genSaltSync(10);
  try {
    await db.sequelize.sync({force: true});
    console.log('Drop and Resync Db');

    //create test data
    await db.user.create({
      email: 'ivan@qqq.ru',
      password: bcrypt.hashSync("ivan", bcrypt_salt)
    });
    await db.user.create({
      email: 'admin@qqq.ru',
      password: bcrypt.hashSync("admin", bcrypt_salt)
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = db;