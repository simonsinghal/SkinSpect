// controllers/adminController.js
const User = require('../models/userModel');
const Scan = require('../models/scanModel');
const Activity = require('../models/activityModel');

exports.getTotalUsersCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error fetching total user count:', error);
    res.status(500).json({ message: 'Failed to fetch total user count' });
  }
};

exports.getTotalAnalysisCount = async (req, res) => {
  try {
    const count = await Scan.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error fetching total analysis count:', error);
    res.status(500).json({ message: 'Failed to fetch total analysis count' });
  }
};

exports.getRecentActivity = async (req, res) => {
  try {
    const recentActivity = await Activity.find({})
      .sort({ timestamp: -1 })
      .limit(10)
      .populate('userId', 'fullName')
      .populate('textAnalysisId')
      .populate('imageAnalysisId');

    console.log("Raw recentActivity data from database:", recentActivity);

    const formattedActivity = recentActivity.map(activity => {
      let inputDetails = "";
    
      if (activity.activityType === 'Image Analysis Submitted' && activity.imageFilename) {
        inputDetails = `http://localhost:5000/uploads/${activity.imageFilename}`;
      }
      else if (activity.activityType === 'Text Analysis Submitted' && activity.textAnalysisId?.symptoms) {
        inputDetails = activity.textAnalysisId.symptoms.join(', ');
      }
    
      return {
        id: activity._id,
        activityType: activity.activityType,
        inputDetails,
        user: activity.userId?.fullName || 'Unknown',
        timestamp: activity.timestamp || activity.createdAt, 
      };
    });
    

    console.log("Formatted activity data being sent to frontend:", formattedActivity);

    res.json(formattedActivity);
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    res.status(500).json({ error: 'Server error' });
  }
};