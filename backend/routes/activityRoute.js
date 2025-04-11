// routes/activity.js
const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController'); 

// Route to record an activity log
router.post('/activity-log', activityController.recordActivity);

module.exports = router;