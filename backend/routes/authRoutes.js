const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const decryptMiddleware = require("../middleware/decryptMiddleware");

router.post("/register", decryptMiddleware, registerUser);
router.post("/login", decryptMiddleware, loginUser);

module.exports = router;
