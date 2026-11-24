const router = require('express').Router();
const {registerUser, loginUser, logoutUser, getCurrentUser} = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware');

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get current user
router.get("/me", authMiddleware, getCurrentUser);

// logout
router.post('/logout', logoutUser)

module.exports = router;