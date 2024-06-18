// user.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4() }, // Setting _id to use UUID
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: null },
  confirmed: { type: Boolean, default: false }, // Flag to track email confirmation
  googleId: { type: String, default: null },
});

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id,
      type: "auth",
    },
    process.env.JWT_SECRET_AUTH,
    {
      expiresIn: "24h",
    },
  );
  return token;
};

// Generate email confirmation token
userSchema.methods.generateConfirmationToken = function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id,
      type: "email-confirmation",
    },
    process.env.JWT_SECRET_EMAIL_CONFIRM,
    {
      expiresIn: "24h",
    },
  );

  return token;
};

// Generate password reset token
userSchema.methods.generateResetToken = function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id,
      type: "password-reset",
    },
    process.env.JWT_SECRET_PASSWORD_RESET,
    {
      expiresIn: "1h",
    },
  );
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
