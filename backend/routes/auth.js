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
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Username or Email already exists
 *       500:
 *         description: Internal server error
 */

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res
        .status(400)
        .json({ message: "Username or Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    user = new User({ username, email, password: hashedPassword }); // Save hashed password
    await user.save();

    // Send email confirmation
    const confirmationToken = user.generateAuthToken(); // Ensure this method exists in your User model
    const confirmationLink = `${process.env.HOST_URL}/${process.env.HOST_URL_ENDPOINTS}/auth/confirm/${confirmationToken}`;
    const mailOptions = {
      from: process.env.MAIL_SENDER,
      to: email,
      subject: "Confirm your email",
      html: `Click <a href="${confirmationLink}">here</a> to confirm your email.`,
    };
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "User registered successfully. Please confirm your email.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/confirm/:token", async (req, res) => {
  const token = req.params.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.confirmed = true;
    await user.save();
    const authToken = user.generateAuthToken();
    res.redirect(`${process.env.REDIRECT_URL}?token=${authToken}`); // Redirect to login page
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               auth_identifier:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post("/login", async (req, res) => {
  const { auth_identifier, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: auth_identifier }, { username: auth_identifier }],
    });
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
