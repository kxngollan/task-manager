const { sign } = require('jsonwebtoken');

const KEY = process.env.JWTSECRET;

const createJSONToken = (email) => {
  return sign({ email }, KEY, { expiresIn: '24h' });
};

module.exports = { createJSONToken };
