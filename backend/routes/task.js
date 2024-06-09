const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.delete("delete/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.owner.toString() !== req.user._id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/add", authMiddleware, async (req, res) => {
  const { board, title, description, taskIcon, status } = req.body;
  try {
    const newTask = new Task({
      board,
      title,
      description,
      taskIcon,
      status
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/update/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, description, taskIcon, status } = req.body;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const containerBoard = await Board.findById(task.board);
    if (containerBoard.owner.toString() !== req.user._id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    task.title = title;
    task.description = description;
    task.taskIcon = taskIcon;
    task.status = status;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
