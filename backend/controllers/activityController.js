// controllers/activityController.js
const Activity = require('../models/activityModel');

// Controller function to record an activity log
exports.recordActivity = async (req, res) => {
  try {
    const { userId, activityType, details } = req.body;
    const newActivity = new Activity({
      userId,
      activityType,
      details,
    });
    await newActivity.save();
    res.status(201).json({ message: 'Activity log recorded successfully' });
  } catch (error) {
    console.error('Error recording activity log:', error);
    res.status(500).json({ message: 'Failed to record activity log' });
  }
};