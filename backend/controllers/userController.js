// controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// GET: All users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude passwords
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET: User stats (total users, admins)
exports.getUserStats = async (req, res) => {
  try {
    const totalAccounts = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    res.json({ totalAccounts, totalAdmins });
  } catch (err) {
    console.error("Error fetching user stats:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST: Create user
exports.createUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT: Update user
exports.updateUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ error: 'User not found' });

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (role) user.role = role;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE: Delete user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: 'Server error' });
  }
};
