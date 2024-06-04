const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");


dotenv.config();
const router = express.Router();



// Login route
router.post("/login", async (req, res) => {
  const { auth_identifier, password } = req.body;
  try {
    const user = await User.findOne({ $or: [{ email: auth_identifier }, { username: auth_identifier }] });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = user.generateAuthToken();
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
