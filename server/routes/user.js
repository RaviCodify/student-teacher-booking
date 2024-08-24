const express = require("express");
const router = express.Router();
const { getUserList, deleteUser, getUserById, signupUser, loginUser, getTeacherList } = require('../controllers/userController');
const authenticateToken = require("../middleware/authenticateToken");

// Sign-Up Route
router.post('/signup', signupUser);

// Login Route
router.post('/login', loginUser);

// Fetch teacher list for public
router.get("/public/teachers", getTeacherList);

// Fetch student and teacher (list/individual)  
router.get("/user",authenticateToken, getUserList);
router.get("/user/:id",authenticateToken, getUserById);

// Delete Route
router.delete("/:id",authenticateToken, deleteUser);

module.exports = router;
