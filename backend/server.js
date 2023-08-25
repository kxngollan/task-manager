import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

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

app.get('/api', async (req, res) => {
  try {
    const allItems = await List.find();
    res.json(allItems);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.post('/api/add', async (req, res) => {
  try {
    const { title, description, date, id, status } = req.body;

    const newListItem = new List({
      title: title,
      description: description,
      date: date,
      id: id,
      status: status,
    });

    await newListItem.save();

    console.log('Item added to ToDoList');
    res.status(201).json({ message: 'Item added to ToDoList' });
  } catch (error) {
    console.error('Error adding to List:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
