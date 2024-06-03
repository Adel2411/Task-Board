import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
  _id: { type: Number, required: true, unique: true },
  name: { type: String, required: true }
});

// Creating a plugin for auto-incrementing _id field

export default mongoose.model('Status', statusSchema);
