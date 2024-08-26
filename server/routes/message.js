const express = require('express');
const { createMessage, getMessages } = require('../controllers/messageController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

// Create a message
router.post('/send',authenticateToken, createMessage);

// Fetch messages
router.get('/:id',authenticateToken, getMessages)


module.exports = router;