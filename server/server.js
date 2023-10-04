import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB = process.env.MONGODBURL;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
  })
);

mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an Email!'],
    unique: [true, 'Email Exist'],
  },
  password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
  });
  await newUser
    .save()
    .then(() => {
      res.json(newUser);
    })
    .catch((err) => {
      res.status(500).json({ message: err.toString() });
    });
});

app.post('/login', async (req, res) => {
  User.findOne({ email: req.body.email, password: req.body.password })
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: 'failed to authenticate' });
        return;
      }

      if (user) {
        res.json({ user });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.toString() });
    });
});

const listSchema = new mongoose.Schema({
  user: String,
  title: String,
  description: String,
  date: String,
  id: String,
  status: String,
});

const List = mongoose.model('List', listSchema);

// Fetch all items
app.get('/api', async (req, res) => {
  const username = req.bo.username;
  if (!username) {
    return res
      .status(403)
      .json({ message: 'only logged in user can access this route' });
  }

  try {
    const allItems = await List.find({ username });
    res.json(allItems);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new item
app.post('/api/add', async (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res
      .status(403)
      .json({ message: 'only logged in user can access this route' });
  }

  try {
    const { user, title, description, date, id, status } = req.body;
    const newListItem = new List({
      user: username,
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
app.delete('/api/delete', async (req, res) => {
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
app.put('/api/update', async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
