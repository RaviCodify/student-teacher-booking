require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://student-teacher-booking.onrender.com",
      "http://127.0.0.1:5173"
    ];
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};


const app = express();
const port = 5000;


// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", require("./routes/user"));
app.use("/api/messages", require("./routes/message"));
app.use("/api/bookings", require("./routes/booking"));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
