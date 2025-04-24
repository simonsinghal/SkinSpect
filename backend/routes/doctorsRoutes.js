const express = require('express');
const router = express.Router();
const doctorsController = require('../controllers/doctorsController');

router.post('/nearby', doctorsController.getNearbyDermatologists);

module.exports = router;