const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const taskSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  board: { type: String, ref: 'Board', required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  taskIcon: { type: String, default: 'default-icon' },
  status: { type: Number, ref: 'Status', default: 0 }
});

module.exports = mongoose.model('Task', taskSchema);

