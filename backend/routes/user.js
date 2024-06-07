const express = require("express");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/user-data", authMiddleware, (req, res) => {
  res.json({
    "username": req.user.username,
    "email": req.user.email,
  });
});


module.exports = router;
