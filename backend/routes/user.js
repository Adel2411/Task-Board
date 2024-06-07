const express = require("express");
const authMiddleware = require("../middleware/auth");

const router = express.Router();
/**
 * @swagger
 * /user/user-data:
 *   get:
 *     summary: Retrieve user data
 *     description: Retrieve the username and email of the authenticated user.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: A JSON object containing the user's username and email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *       401:
 *         description: Unauthorized
 */

router.get("/user-data", authMiddleware, (req, res) => {
  res.json({
    "username": req.user.username,
    "email": req.user.email,
  });
});


module.exports = router;
