const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const decryptMiddleware = require("../middleware/decryptMiddleware");

router.post("/", authMiddleware, decryptMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.put("/:id", authMiddleware, decryptMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
