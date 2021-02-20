const db = require('../db');

async function getUserFromEmail(email) {
  return await getUser({email});
}

/**
 *
 * @param {object} clauses
 * The clauses must be object for sequelize WHERE clauses
 */
async function getUser(clauses) {
  const user = await db.user.findOne({where: clauses});
  return user;
}

function makePasswordHash(password) {
  const bcrypt = require('bcryptjs');
  const bcrypt_salt = bcrypt.genSaltSync(+process.env.AUTH_SALT_LENGTH);
  return bcrypt.hashSync(password, bcrypt_salt);
}

async function registerUser(userData) {
  const user = db.user.create({
    email: userData.email,
    password: makePasswordHash(userData.password)
  });
  return user;
}

async function getUserList(params = {}) {
  return users = await db.user.findAll(params);
}

/**
 * Меняем пароль у пользователя с переданным email
 * @param {String} email
 * @param {String} newPassword
 */
async function changePassword(email, newPassword) {

  const passwordHash = makePasswordHash(newPassword);
  await db.user.update({password: passwordHash }, {
    where: {
      email
    }
  });
}


const service = {
  getUserFromEmail,
  getUser,
  registerUser,
  getUserList,
  changePassword,
};
module.exports = service;