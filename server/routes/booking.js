// routes/booking.js
const express = require('express');
const router = express.Router();
const { createBooking, getBooking, updateBooking, deleteBooking, getBookingById } = require('../controllers/bookController');
const authenticateToken = require('../middleware/authenticateToken');

// Create a booking
router.post('/book', authenticateToken , createBooking);


// Admin Endpoints
// Get all bookings 
router.get('/all',authenticateToken , getBooking);

// Update booking status 
router.patch('/update/:id',authenticateToken, updateBooking);

// Delete booking
router.delete('/delete/:id',authenticateToken, deleteBooking);


// Get booking for teacher and student dashboard by id
router.get('/:id',authenticateToken, getBookingById);



module.exports = router;
