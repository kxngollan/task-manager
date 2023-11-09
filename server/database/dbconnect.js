const pg = require('pg');
require('dotenv').config();

const dbConnect = () => {
  const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'list',
    password: process.env.PASSWORD,
    port: 5432,
  });

  client.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database');
  });

  return client;
};

module.exports = dbConnect;
