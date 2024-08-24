const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { 
    type: String, 
    required: function() {
      return this.role === "teacher"; // Subject is required only if the user is a teacher
    }
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["student", "teacher", "admin"] },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
