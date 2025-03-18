const express = require('express');
const router = express.Router();
const InterestedTopic = require('../models/InterestedTopic');

// Get Interested Topics
router.get('/', async (req, res) => {
  try {
    const interestedTopic = await InterestedTopic.findOne();
    res.status(200).json(interestedTopic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Interested Topics
router.post('/', async (req, res) => {
  try {
    const { topics } = req.body;

    let interestedTopic = await InterestedTopic.findOne();
    if (!interestedTopic) {
      interestedTopic = new InterestedTopic({
        topics,
      });
    } else {
      interestedTopic.topics = topics;
    }

    await interestedTopic.save();
    res.status(200).json(interestedTopic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;