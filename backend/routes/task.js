const express = require("express");
const Task = require("../models/Task");
const Board = require("../models/Board");
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
 *                   example: Task deleted successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */

router.delete("/delete/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const containerBoard = await Board.findById(task.board);
    if (containerBoard.owner !== req.user._id) {
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
 *                 description: The board ID
 *                 example: 2ae85590-d8a3-438f-b355-0e6482b2c53b
 *               title:
 *                 type: string
 *                 description: The task title
 *                 example: Task 1
 *               description:
 *                 type: string
 *                 description: The task description
 *                 example: This is a task
 *               taskIcon:
 *                 type: string
 *                 description: The task icon name
 *                 example: default-icon
 *               status:
 *                 type: integer
 *                 description: The task status id
 *                 example: 0
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
 *                   example: 2ae85590-d8a3-438f-b355-0e6482b2c53b
 *                 title:
 *                   type: string
 *                   example: Task 1
 *                 description:
 *                   type: string
 *                   example: This is a task
 *                 taskIcon:
 *                   type: string
 *                   example: default-icon
 *                 status:
 *                   type: integer
 *                   example: 0
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
      status,
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
 *                 description: The task title
 *                 example: updated task title
 *               description:
 *                 type: string
 *                 description: The task description
 *                 example: updated task description
 *               taskIcon:
 *                 type: string
 *                 description: The task icon name
 *                 example: updated-icon
 *               status:
 *                 type: integer
 *                 description: The task status id
 *                 example: 1
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                 type: string
 *                 example: Task updated successfully
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
    console.log(task);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const containerBoard = await Board.findById(task.board);
    if (containerBoard.owner !== req.user._id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    task.title = title;
    task.description = description;
    task.taskIcon = taskIcon;
    task.status = status;

    await task.save();
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
