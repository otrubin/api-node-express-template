const db = require('../db');

function makeToken(payload, options = {}) {
  const jwt = require('jsonwebtoken');
  return jwt.sign(payload, process.env.AUTH_JWT_SECRET_KEY, options);
}

const service = {
  makeToken
};
module.exports = service;