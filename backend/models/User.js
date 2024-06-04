// user.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4() }, // Setting _id to use UUID
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmed: { type: Boolean, default: false }, // Flag to track email confirmation
});

// Hash the password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h", // Set expiration to 24 hours
  });
  return token;
};

// Generate email confirmation token
userSchema.methods.generateConfirmationToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15min", // Set expiration to 15 minutes
  });

  return token;
};

// Generate password reset token
userSchema.methods.generateResetToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15min", 
  });
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
