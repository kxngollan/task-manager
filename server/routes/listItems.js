const express = require('express');
const route = express.Router();

const mongoose = require('mongoose');
const List = require('../database/listModel');

// Check token for protected routes.
const { tokenCheck } = require('../util/auth');

route.use(tokenCheck);

// Fetch all lists items from database
route.get('/fetchitems', async (req, res, next) => {
  try {
    const user = req.session.user;
    const email = user.email;
    const lists = await List.find({ email: email });
    const sorted = [...lists].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    res.status(201).send(sorted);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Add items to list
route.post('/additem', async (req, res, next) => {
  try {
    const { title, description, date, listId } = req.body;
    console.log(title, description, date, listId);
    const user = req.session.user;
    const email = user.email;
    const list = new List({
      title,
      description,
      date,
      email,
      listId,
      listStatus: 'Pending',
    });
    await list.save();
    res.status(201).send({ message: 'Item added successfully', listId });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Delete item from list
route.delete('/deleteitem', async (req, res, next) => {
  body = req.body;
  try {
    const listId = req.body.listId;

    console.log(listId);

    if (!listId) {
      return res
        .status(400)
        .send({ error: 'Missing listId in the request body.' });
    }

    const deleteResult = await List.deleteOne({
      email: req.session.user.email,
      listId: listId,
    });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).send({ error: 'Item not found or not deleted.' });
    }

    res.status(204).end();
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).send({ error: 'Internal Server Error.' });
  }
});

//Update item from list
route.put('/updateitem', async (req, res, next) => {
  try {
    const { listId, listStatus } = req.body;
    const newStatus = listStatus === 'Pending' ? 'Complete' : 'Pending';
    await List.updateOne(
      { email: req.session.user.email, listId: listId },
      { listStatus: newStatus }
    );

    res.status(201).send({ message: 'Item updated successfully', listId });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = route;
