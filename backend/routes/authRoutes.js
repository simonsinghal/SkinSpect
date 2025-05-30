const express = require('express');
const router = express.Router();
const { register, login, updateProfile } = require('../controllers/authController.js');
const protect = require('../middleware/requireAuth.js');

console.log("register:", register);
console.log("login:", login);
console.log("updateProfile:", updateProfile);

// Register and login
router.post('/register', register);
router.post('/login', login);

// Route to get current user's profile
router.get('/profile', protect, (req, res) => {
    res.json(req.user);
});

//Route to update profile
router.put('/update-profile', protect, updateProfile);


module.exports = router;