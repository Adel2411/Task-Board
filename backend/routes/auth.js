const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");

dotenv.config();
const router = express.Router();

// Email configuration
var transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});


// Registration route

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({ message: "Username or Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    user = new User({ username, email, password: hashedPassword }); // Save hashed password
    await user.save();

    // Send email confirmation
    const confirmationToken = user.generateAuthToken(); // Ensure this method exists in your User model
    const confirmationLink = `${process.env.HOST_URL}/api/auth/confirm/${confirmationToken}`;
    const mailOptions = {
      from: process.env.MAIL_SENDER,
      to: email,
      subject: "Confirm your email",
      html: `Click <a href="${confirmationLink}">here</a> to confirm your email.`,
    };
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "User registered successfully. Please confirm your email.",
      token: confirmationToken,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Email confirmation route
router.get("/confirm/:token", async (req, res) => {
  const token = req.params.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.confirmed = true;
    await user.save();

    res.redirect(process.env.REDIRECT_URL); // Redirect to login page
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
});

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