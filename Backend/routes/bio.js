const express = require('express');
const router = express.Router();
const Bio = require('../models/Bio');

// Get Bio
router.get('/', async (req, res) => {
  try {
    const bio = await Bio.findOne();
    res.status(200).json(bio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Bio
router.post('/', async (req, res) => {
  try {
    const { bio } = req.body;

    let bioData = await Bio.findOne();
    if (!bioData) {
      bioData = new Bio({
        bio,
      });
    } else {
      bioData.bio = bio;
    }

    await bioData.save();
    res.status(200).json(bioData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;