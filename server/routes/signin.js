const express = require('express');
const pg = require('pg');

const route = express.Router();

const db = require('../database/dbconnect');

// Register
route.post('/register', async (req, res, next) => {
  const { email, password } = req.body;
  const query =
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
  const values = [email, password];

  try {
    const result = await db.query(query, values);
    const user = result.rows[0];
    req.session.user = user;
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Login
route.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
  const values = [email, password];

  try {
    const result = await db.query(query, values);
    const user = result.rows[0];
    if (!user) {
      res.status(401).json({ message: 'Failed to authenticate' });
      return;
    }
    req.session.user = user;
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Logout
route.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Logged out successfully' });
    }
  });
});

module.exports = route;
