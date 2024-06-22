const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const taskSchema = require('./Task');

const boardSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 }, // Setting _id to use UUID
  name: { type: String, required: true },
  description: { type: String, default: null },
  owner: { type: String, ref: 'User', required: true }, // Correcting ref syntax
  is_public: { type: Boolean, default: false }, // Simplifying the default value placement
  tasks: []
});

module.exports = mongoose.model('Board', boardSchema);

