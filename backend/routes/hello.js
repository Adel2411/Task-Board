const express = require("express");
const User = require("../models/User");

const router = express.Router();

/**
 * @swagger
 * /hello-world:
 *   get:
 *     summary: send hello world
 *     tags: [Hello]
 *     responses:
 *       200:
 *         description: api is working
 *
 */

router.get("/hello-world", async (req, res) => {
  // drop the user database mongodb
  await User.deleteMany({});
  res.send("Hello World");
});

module.exports = router;
