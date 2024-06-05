const express = require("express");
const Board = require("../models/Board");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Create a new board
router.post("/add", authMiddleware, async (req, res) => {
  const { name, description, is_public } = req.body;
  try {
    const newBoard = new Board({
      name,
      description,
      owner: req.user._id,
      is_public,
    });
    await newBoard.save();
    res.status(201).json(newBoard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
