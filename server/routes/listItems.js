const express = require('express');
const mongoose = require('mongoose');

const route = express.Router();

const List = require('../database/listModel');

// Fetch all items
route.get('/fetchitems', (req, res, next) => {
  const user = req.session.user;
  if (!user) {
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
route.post('/additems', async (req, res, next) => {
  const email = req.session.user.email;
  try {
    const { title, description, date, id, listStatus } = req.body;
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
route.delete('/deleteitems', async (req, res, next) => {
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
route.put('/updateitemstatus', async (req, res, next) => {
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

module.exports = route;
