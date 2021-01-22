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

async function registerUser(userData) {
  const bcrypt = require('bcryptjs');
  const bcrypt_salt = bcrypt.genSaltSync(+process.env.AUTH_SALT_LENGTH);

  const user = db.user.create({
    email: userData.email,
    password: bcrypt.hashSync(userData.password, bcrypt_salt)
  });
  return user;
}

function isValidPassword(password, user) {
  const bcrypt = require('bcryptjs');
  const res = bcrypt.compareSync(
    password,
    user.password
  );
  return res;
}

const service = {
  getUserFromEmail,
  getUser,
  registerUser,
  isValidPassword
};
module.exports = service;