
const express = require("express");
const router = express.Router();

const {
    createTask,
    updateTask,
    deleteTask,
    getTask
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");

// All task routes require authentication
router.get('/', authMiddleware, getTask)

router.post("/", authMiddleware, createTask);

router.put("/:id", authMiddleware, updateTask);

router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
