const express = require('express');
const { Pool } = require('pg');

const db = require('../database/dbconnect');

const route = express.Router();

// Fetch all items
route.get('/fetchitems', async (req, res, next) => {
  const user = req.session.user;
  if (!user) {
    return res
      .status(403)
      .json({ message: 'Only logged in user can access this route' });
  }

  const email = req.session.user.email;

  try {
    const result = await pool.query('SELECT * FROM list WHERE email = $1', [
      email,
    ]);
    const allItems = result.rows;
    res.send(allItems);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new item
route.post('/additems', async (req, res, next) => {
  const email = req.session.user.email;

  try {
    const { title, description, date, id, listStatus } = req.body;
    id = key;
    const query = `
      INSERT INTO list (email, title, description, date, key, status)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values = [email, title, description, date, key, listStatus];

    await pool.query(query, values);

    console.log('Item added to ToDoList: ' + id);
    res.status(201).json({ message: 'Item added successfully' });
  } catch (error) {
    console.error('Error adding to List:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete an item
route.delete('/deleteitems', async (req, res, next) => {
  try {
    const itemId = req.body.id;

    const result = await pool.query('DELETE FROM list WHERE id = $1', [itemId]);

    if (result.rowCount === 1) {
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

    const result = await pool.query(
      'UPDATE list SET status = $1 WHERE id = $2',
      [newStatus, id]
    );

    if (result.rowCount === 1) {
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
