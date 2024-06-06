const express = require("express");
const Board = require("../models/Board");
const authMiddleware = require("../middleware/auth");
const Task = require("../models/Task");

const router = express.Router();

/**
 * @swagger
 * /boards/add:
 *   post:
 *     summary: Create a new board
 *     tags:
 *       - Boards
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Board"
 *               description:
 *                 type: string
 *                 example: "Board description"
 *               is_public:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       '201':
 *         description: Board created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /boards/getAll:
 *   get:
 *     summary: Get all boards
 *     tags:
 *       - Boards
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of boards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Board'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/getAll", authMiddleware, async (req, res) => {
  try {
    const boards = await Board.find({ owner: req.user._id });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /boards/update/{id}:
 *   put:
 *     summary: Update a board
 *     tags:
 *       - Boards
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Board Name"
 *               description:
 *                 type: string
 *                 example: "Updated Board Description"
 *               is_public:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       '200':
 *         description: Board updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       '404':
 *         description: Board not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '403':
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/update/:id", authMiddleware, async (req, res) => {
  const boardId = req.params.id;
  const { name, description, is_public } = req.body;
  try {
    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ message: "Board not found" });
    if (board.owner.toString() !== req.user.id) {
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

/**
 * @swagger
 * /boards/delete/{id}:
 *   delete:
 *     summary: Delete a board
 *     tags:
 *       - Boards
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Board deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Board deleted successfully"
 *       '404':
 *         description: Board not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '403':
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  const boardId = req.params.id;
  try {
    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ message: "Board not found" });
    if (board.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    await Board.findByIdAndDelete(boardId);
    res.json({ message: "Board deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /boards/{id}:
 *   get:
 *     summary: Get board by ID with all tasks
 *     tags:
 *       - Boards
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Board with tasks
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoardWithTasks'
 *       '404':
 *         description: Board not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '403':
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", authMiddleware, async (req, res) => {
  const boardId = req.params.id;
  try {
    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ message: "Board not found" });
    if (board.owner.toString() !== req.user.id && !board.is_public) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const tasks = await Task.find({ board: boardId });
    board.tasks = tasks;
    res.json(board);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /boards/public/{id}:
 *   get:
 *     summary: Get public board by ID with all tasks
 *     tags:
 *       - Boards
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Public board with tasks
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoardWithTasks'
 *       '404':
 *         description: Board not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '403':
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/public/:id", async (req, res) => {
  const boardId = req.params.id;
  try {
    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ message: "Board not found" });

    if (!board.is_public) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const tasks = await Task.find({ board: boardId });
    board.tasks = tasks;
    res.json(board);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
