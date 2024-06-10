const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * /tasks/delete/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Task not found
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */

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

/**
 * @swagger
 * /tasks/add:
 *   post:
 *     summary: Add a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - board
 *               - title
 *               - description
 *               - taskIcon
 *               - status
 *             properties:
 *               board:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               taskIcon:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 board:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 taskIcon:
 *                   type: string
 *                 status:
 *                   type: string
 *       500:
 *         description: Server error
 */


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

/**
 * @swagger
 * /tasks/update/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               taskIcon:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 taskIcon:
 *                   type: string
 *                 status:
 *                   type: string
 *       404:
 *         description: Task not found
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */

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
