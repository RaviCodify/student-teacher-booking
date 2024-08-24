const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { jwtSecret, jwtExpiration } = require("../config/config");

exports.signupUser = async (req, res) => {
  const { name, subject, email, password, userRole } = req.body;
  console.log(req.body);

  try {
    // Check if the userRole is admin and if an admin already exists
    if (userRole === "admin") {
      const checkAdmin = await User.findOne({ role: "admin" });
      console.log("Admin check result:", checkAdmin);
      if (checkAdmin) {
        return res.status(401).json({ message: "Admin already exists" });
      }
    }

    // Check if user with same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      subject : userRole==='teacher' ? subject : undefined,
      email,
      password: hashedPassword,
      role: userRole,
    });

    // Save the user
    const savedUser = await newUser.save();
    res.status(201).json({ savedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password, userRole } = req.body;

  try {
    // Find the user by email and user role
    const existingUser = await User.findOne({ email, role: userRole});

    if (!existingUser) {
      return res.status(404).json({ message: "user not found" });
    }

    // Compare the requested password with saved password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (isMatch) {
      // Create a JWT token
      const token = jwt.sign(
        { userId: existingUser._id, userRole: existingUser.role },
        jwtSecret,
        { expiresIn: jwtExpiration } 
      );

      // Send the response with the token
      res.status(200).json({ success: true, user: existingUser, token });
    } else {
      res.status(401).json({ message: "Password is incorrect" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

exports.getUserById = async (req, res) => {
  try {
    // Find user by id
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserList = async (req, res) => {
  try {
    const {userType} = req.body;
    // This ensures students can only access teacher's list
    const users = await User.find({ userRole: userType });
    res.json(users);    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getTeacherList = async (req, res) => {
  try {
    // Gets all the user
    const users = await User.find();
    res.json(users);    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    // Remove the selected user from the database
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
