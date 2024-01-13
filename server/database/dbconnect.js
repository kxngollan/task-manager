const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB = process.env.MONGODBURL;

const dbConnect = () => {
  mongoose
    .connect(MONGODB)
    .then(() => {
      console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
      console.log('Unable to connect to MongoDB Atlas!');
      console.error(error);
    });
};

module.exports = dbConnect;
