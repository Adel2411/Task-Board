const express = require("express")
const router = express.Router();

/**
 * @swagger
 * /hello-world:
 *   post:
 *     summary: send hello world 
 *     tags: [Hello]
 *     responses:
 *       200:
 *         description: api is working
 *
*/

router.get("/hello-world", async (req, res) => {
  res.send("hello world")
})


module.exports = router;
