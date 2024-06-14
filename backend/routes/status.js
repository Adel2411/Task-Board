const express = require("express");
const Status = require("../models/Status");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

/**
  *  @swagger
  * /status/getAll:
  *  get:
  *    summary: Get all statuses
  *    tags: [Status]
  *    security:
  *    - bearerAuth: []
  *    responses:
  *     200:
  *       description: List of statuses
  *       content:
  *         application/json:
  *       schema:
  *       type: array
  *       items:
  *         $ref: '#/components/schemas/Status'
  *     500:
  *      description: Server error
  *
  *
  *

  */
router.get("/getAll", async (req, res) => {
  try {
    const statuses = await Status.find();
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
