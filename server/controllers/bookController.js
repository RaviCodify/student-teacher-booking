const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  const { studentId, teacherId, date } = req.body;
  try {
    const existingBooking = await Booking.find({
      student: studentId,
      teacher: teacherId,
    });
    // Check for bookings to avoid redundancy
    if (existingBooking.length > 0) {
      return res.status(400).json({ message: "Booking already exists" });
    }

    // Create a new booking
    const booking = new Booking({
      student: studentId,
      teacher: teacherId,
      date,
    });

    // Saves the booking
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBooking = async (req, res) => {
  try {
    // Get all bookings
    const bookings = await Booking.find().populate(["student", "teacher"]);
    res.status(200).json(bookings);    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBookingById = async (req, res) => {
  const { id } = req.params;
  const { userRole } = req.query;
  console.log('User Role:', req.query.userRole);
  console.log('User Id:', req.params.id);
  try {
    const query =
      userRole === "student"
        ? { student: id }
        : userRole === "teacher"
        ? { teacher: id }
        : null;

    if (!query) {
      return res.status(400).json({ message: "Invalid user role" });
    }

    // Get bookings by students/teachers id
    const bookings = await Booking.find(query).populate(["student", "teacher"]);

    if (!bookings)
      return res.status(404).json({ message: "Booking not found" });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBooking = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  try {
    // Update booking status
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate(["student", "teacher"]);
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    // Delete booking by id
    const booking = await Booking.findByIdAndDelete(req.params.id).populate([
      "student",
      "teacher",
    ]);
    console.log(booking.student.name);
    
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
