const https = require('https');
const http = require('http');
const fs = require('fs');

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const cors = require('cors');
require('dotenv').config();
const session = require('express-session');

const MongoDBStore = require('connect-mongodb-session')(session);

// Databse
const dbConnect = require('./database/dbconnect');

// Connect to DB
dbConnect();

// MongoDB Store
const MONGODB = process.env.MONGODBURL;

const MONGODBstore = new MongoDBStore({
  uri: MONGODB,
  collection: 'sessions',
  expires: 1000 * 60 * 60,
});
MONGODBstore.on('error', (error) => {
  console.error(error);
});

const signin = require('./routes/signin');
const listItems = require('./routes/listItems');

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
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
    store: MONGODBstore,
    cookie: {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use('/signin', signin);

app.use('/list', listItems);

const PORT = process.env.PORT || 8000;

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
} else {
  http.createServer(app).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
