const db = require('../db');

function makeToken(payload, options = {}) {
  const jwt = require('jsonwebtoken');
  return jwt.sign(payload, process.env.AUTH_JWT_SECRET_KEY, options);
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
  makeToken,
  isValidPassword
};
module.exports = service;