// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Activity = require('../models/activityModel');

router.get('/', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const recentActivity = await Activity.find().sort({ timestamp: -1 }).limit(10).populate('userId', 'fullName');

    res.json({ totalUsers, recentActivity });
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;