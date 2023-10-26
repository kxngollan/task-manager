const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  email: String,
  title: String,
  description: String,
  date: String,
  id: String,
  status: String,
});

module.exports = mongoose.model('List', listSchema);
