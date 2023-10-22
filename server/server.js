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

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//CORS
// This clear CORS err
app.use(
  cors({
    origin: process.env.SITE,
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
  })
);

//Express Sessions
app.set('trust proxy', 1);
app.use(
  session({
    secret: 'secret',
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

// Logout
app.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Logged out successfully' });
    }
  });
});

// Fetch all items
app.get('/fetchitems', (req, res, next) => {
  const user = req.session.user;
  console.log('Session user set:', user);
  if (!user) {
    return res
      .status(403)
      .json({ message: 'Only logged in user can access this route' });
  }

  const email = user.email;

  List.find({ email: email })
    .then((allItems) => {
      res.send(allItems);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

// Add a new item
app.post('/additems', async (req, res, next) => {
  try {
    const { email, title, description, date, id, listStatus } = req.body;
    const newListItem = new List({
      email: email,
      title: title,
      description: description,
      date: date,
      id: id,
      status: listStatus,
    });

    const newListItemId = newListItem.id;

    await newListItem.save();

    console.log('Item added to ToDoList: ' + newListItemId);
    res.status(201).json({ message: 'Item added successfully:' });
  } catch (error) {
    console.error('Error adding to List:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete an item
app.delete('/deleteitems', async (req, res, next) => {
  try {
    const itemId = req.body.id;

    const listDelete = await List.deleteOne({ id: itemId }).exec();

    if (listDelete.deletedCount === 1) {
      console.log('Item deleted:', itemId);
      res.status(200).json({ message: 'Item deleted successfully' });
    } else {
      console.log('Item not found:', itemId);
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update item status
app.put('/updateitemstatus', async (req, res, next) => {
  try {
    const { status, id } = req.body;
    const newStatus = status === 'Pending' ? 'Complete' : 'Pending';

    const ListUpdate = await List.updateOne({ id: id }, { status: newStatus });

    if (ListUpdate.modifiedCount === 1) {
      console.log('Update successful');
      res.status(204).end();
    } else {
      console.log('No document was modified');
      res.status(200).json({ message: 'No document was modified' });
    }
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use((req, res, next) => {
  res.status(404).send('<h1>404 Page not found</h1>');
});

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
