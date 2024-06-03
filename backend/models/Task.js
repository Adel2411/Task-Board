import mongoose from "mongoose";

import { v4 as uuidv4 } from "uuid";


const taskSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  board: { type: String, ref: 'Board', required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  taskIcon: { type: String, default: "default-icon" },
  status: { type: mongoose.Types.ObjectId, ref: 'Status', default: 0 }
})

export default mongoose.model('Task', taskSchema);
