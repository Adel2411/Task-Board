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
    const confirmationToken = user.generateConfirmationToken(); // Ensure this method exists in your User model
    const confirmationLink = `${process.env.HOST_URL}/api/v1/auth/confirm/${confirmationToken}`;
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET_EMAIL_CONFIRM);
    if (decoded.type !== 'email-confirmation') return res.status(400).json({ message: "Invalid token" });
    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.confirmed = true;
    await user.save();
    const authToken = user.generateAuthToken();
    res.redirect(`${process.env.FRONTEND_HOST}/boards?token=${authToken}`); // Redirect to login page
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
 *         content:
 *          application/json:
 *           schema:
 *             properties:
 *              token:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
*       400:
 *         description: Invalid credentials or User not confirmed
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - properties:
 *                     message:
 *                       type: string
 *                       example: Invalid credentials
 *                 - properties:
 *                     message:
 *                       type: string
 *                       example: User not confirmed
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
    if (!user.confirmed) return res.status(400).json({ message: "User not confirmed" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = user.generateAuthToken();
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /auth/request-password-reset:
 *   post:
 *     summary: request password reset link via email
 *     tags: 
 *        - Password Reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset link sent successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: User not confirmed
 *       500:
 *         description: Internal server error
 */

router.post("/request-password-reset", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.confirmed) return res.status(400).json({ message: "User not confirmed" });

    // send email with reset password link
    const resetToken = user.generateResetToken();
    const confirmationLink = `${process.env.HOST_URL}/api/v1/auth/validate-reset-token/${resetToken}`;
    const mailOptions = {
      from: process.env.MAIL_SENDER,
      to: email,
      subject: "reset your password",
      html: `Click <a href="${confirmationLink}">here</a> to reset your password.`,
    };
    await transporter.sendMail(mailOptions);
    res.status(201).json({
      message: "Password reset link sent successfully. Please check your email",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/validate-reset-token/:token", async (req, res) => {
  const token = req.params.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_PASSWORD_RESET);
    console.log(`decoded type : ${decoded.type}`);
    if (decoded.type !== 'password-reset') {
      return res.status(400).json({ message: "Invalid token" });
    }
    res.redirect(`${process.env.FRONTEND_HOST}/reset-password?token=${token}`); // Redirect to reset password page 
  } catch (error) {
    console.log("error", error.message);
    res.status(400).json({ message: "Invalid token" });
  }
});
/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     description: Allows a user to reset their password using a token.
 *     tags:
 *       - Password Reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password for the user.
 *                 example: newpassword123
 *               token:
 *                 type: string
 *                 description: The JWT token received via email.
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description : Invalid token or User not confirmed
 *         content:
 *           application/json:
 *            schema:
 *               oneOf:
 *                 - properties:
 *                     message:
 *                       type: string
 *                       example: Invalid token
 *                 - properties:
 *                     message:
 *                       type: string
 *                       example: User not confirmed
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post("/reset-password", async (req, res) => {
  const { password, token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_PASSWORD_RESET);
    if (decoded.type !== 'password-reset') return res.status(400).json({ message: "Invalid token" });

    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.confirmed) return res.status(400).json({ message: "User not confirmed" });
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    user.password = hashedPassword;
    await user.save();
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
