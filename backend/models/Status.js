const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("Status", statusSchema);
