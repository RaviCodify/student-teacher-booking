require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", require("./routes/user"));
app.use("/api/messages", require("./routes/message"));
app.use("/api/bookings", require("./routes/booking"));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
