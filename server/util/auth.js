const { verify } = require('jsonwebtoken');

const KEY = process.env.JWTSECRET;

const validateJSONToken = async (token) => {
  return await verify(token, KEY);
};

// Check token for protected routes.
const tokenCheck = (req, res, next) => {
  if (!req.headers.authorization) {
    console.log('Authorization header is missing');
    return res
      .status(401)
      .json({ error: 'Unauthorized No Authorization Header' });
  }

  const headers = req.headers.authorization.split(' ');
  const token = headers[1];

  console.log('Token being checked:', token);

  // Check for session
  if (!req.session.user) {
    console.log('No session');
    return res.status(401).json({ error: 'Unauthorized No Sessions Stored' });
  }

  // Check for token
  if (token) {
    try {
      const decoded = validateJSONToken(token);
      req.user = decoded;
      next();
    } catch (err) {
      console.log('Token error \n', err);
      res.status(401).json({ error: 'Unauthorized Invalid Token' });
    }
  } else {
    console.log('No token');
    res.status(401).json({ error: 'Unauthorized No Token Present' });
  }
};

module.exports = { tokenCheck };
