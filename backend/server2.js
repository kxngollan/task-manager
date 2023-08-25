import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import bodyParser from 'body-parser';

const app = express();
const PORT = 0|| ; // Use a default port if PORT is not specified

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/myList', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const listSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  id: String,
  status: String,
});

const List = mongoose.model('List', listSchema);

app.get('/df', (req, res) => {
  // Handle and send back your data here
  res.json({ message: 'API endpoint' });
});

app.post('/api/add', (req, res) => {
  const newListItem = new List({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    id: req.body.id,
    status: 'Pending',
  });

  newListItem
    .save()
    .then(() => {
      console.log('Item added to ToDoList');
      res.json({ message: 'Item added to ToDoList' });
    })
    .catch((error) => {
      console.error('Error adding to List:', error);
      res.status(500).json({ error: 'Failed to add item' });
    });
});

app.put('/api/update', async (req, res) => {
  const itemId = req.body.itemId;
  const itemStatus = req.body.itemStatus;

  const newStatus = itemStatus === 'Pending' ? 'Complete' : 'Pending';

  try {
    const result = await List.updateOne({ id: itemId }, { status: newStatus });

    if (result.modifiedCount === 1 && result.matchedCount) {
      console.log('Update successful');
      res.json({ message: 'Update successful' });
    } else {
      console.log('No document was modified');
      res.status(404).json({ message: 'No document was modified' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
