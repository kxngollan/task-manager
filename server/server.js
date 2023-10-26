const https = require('https');
const http = require('http');
const fs = require('fs');

const express = require('express');
const app = express();

const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);

// Databse
const dbConnect = require('./database/dbconnect');
const List = require('./database/listModel');

// Connect to DB
dbConnect();

const store = new MongoDBStore({
  url: process.env.MONGOURL,
  connection: 'session',
});

const signin = require('./routes/signin');
const listItems = require('./routes/listItems');

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//CORS
// This clear CORS err
app.use(
  cors({
    origin: 'https://astonishing-kashata-33428c.netlify.app/',
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
  })
);

//Express Sessions
app.set('trust proxy', 1);
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 3600000,
    },
  })
);
app.use(signin);

const loggedIn = (req, res, next) => {
  const user = req.session.user;
  if (!user) {
    res.status(401).json({ message: 'Not logged in' });
  } else {
    next();
  }
};

app.use(loggedIn, listItems);

const PORT = process.env.PORT || 8000;

http.createServer(app).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Only run an HTTPS server if we're not in production, otherwise we're expecting production to provide the HTTPS capabilities
if (process.env.NODE_ENV != 'production') {
  const HTTPS_PORT = process.env.HTTPS_PORT || 8443;
  const options = {
    key: fs.readFileSync(`./tls/server.key`),
    cert: fs.readFileSync(`./tls/server.cert`),
  };

  https.createServer(options, app).listen(HTTPS_PORT, () => {
    console.log(`HTTPS server is running on port ${HTTPS_PORT}`);
  });
}
