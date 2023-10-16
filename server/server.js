const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);

// Databse
const dbConnect = require('./database/dbconnect');
const User = require('./database/userModel');
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
app.use(
  cors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
  })
);

//Express Sessions
app.set('trust proxy', 1);
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
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
app.get('/fetchitems/user', (req, res, next) => {
  const user = req.session.user;
  console.log('Session user set:', user);
  if (!req.session.user) {
    return res
      .status(403)
      .json({ message: 'Only logged in user can access this route' });
  }

  const email = req.session.user.email;

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
    const { email, title, description, date, id, status } = req.body;
    const newListItem = new List({
      email: email,
      title: title,
      description: description,
      date: date,
      id: id,
      status: status,
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
