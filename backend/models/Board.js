import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";


const boardSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 }, // Setting _id to use UUID
  name: { type: String, required: true },
  description: { type: String, required: false },
  owner: { type: String, ref: 'User', required: true }, // Correcting ref syntax
  is_public: { type: Boolean, default: false } // Simplifying the default value placement
});

export default mongoose.model('Board', boardSchema);

