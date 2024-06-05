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

// Get all boards
router.get("/getAll", authMiddleware, async (req, res) => {
  try {
    const boards = await Board.find({ owner: req.user._id });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update board
router.put("/update/:id", authMiddleware, async (req, res) => {
  const boardId = req.params.id;
  const { name, description, is_public } = req.body;
  try {
    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ message: "Board not found" });
    if (board.owner !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    const updatedBoard = await Board.findByIdAndUpdate(
      boardId,
      { name, description, is_public },
      { new: true },
    );
    res.json(updatedBoard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
