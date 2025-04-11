const express = require('express');
const router = express.Router();
const Disease = require('../models/diseaseModel'); 
router.get('/diseases', async (req, res) => {
  try {
    const diseases = await Disease.find();
    res.json(diseases);
  } catch (error) {
    console.error('Error fetching diseases from MongoDB:', error);
    res.status(500).json({ error: 'Failed to fetch diseases data from the database' });
  }
});

router.get('/diseases/count', async (req, res) => {
  try {
    const count = await Disease.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error counting diseases in MongoDB:', error);
    res.status(500).json({ error: 'Failed to fetch diseases count from the database' });
  }
});

//more routes here for adding, editing, deleting diseases

module.exports = router;
