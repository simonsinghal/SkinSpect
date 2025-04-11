// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController'); 
const requireAdminAuth = require('../middleware/requireAdminAuth'); 


router.use(requireAdminAuth); 
// Admin analytics
router.get('/users/count', adminController.getTotalUsersCount);
router.get('/analysis/count', adminController.getTotalAnalysisCount);
router.get('/activity/recent', adminController.getRecentActivity);

// Admin user management
router.get('/users', userController.getAllUsers);
router.get('/users/stats', userController.getUserStats);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;