const express = require('express');
const mongoose = require('mongoose');

const route = express.Router();

const User = require('../database/userModel');

// Register
route.post('/register', async (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  user
    .save()
    .then(() => {
      req.session.user = user;
      res.json({ user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.toString() });
    });
});

// Login
route.post('/login', async (req, res, next) => {
  const loggedInUser = { email: req.body.email, password: req.body.password };
  User.findOne(loggedInUser)
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: 'Failed to authenticate' });
        return;
      }
      res.json({ user });
    })
    .catch((err) => {
      res.status(500).json({ message: err.toString() });
    });
});

module.exports = route;
