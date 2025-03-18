const express = require('express');
const router = express.Router();
const SocialMedia = require('../models/SocialMedia');

// Get Social Media Links
router.get('/', async (req, res) => {
  try {
    const socialMedia = await SocialMedia.findOne();
    res.status(200).json(socialMedia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Social Media Links
router.post('/', async (req, res) => {
  try {
    const { linkedin, x, gmail, youtube } = req.body;

    let socialMedia = await SocialMedia.findOne();
    if (!socialMedia) {
      socialMedia = new SocialMedia({
        linkedin,
        x,
        gmail,
        youtube,
      });
    } else {
      socialMedia.linkedin = linkedin;
      socialMedia.x = x;
      socialMedia.gmail = gmail;
      socialMedia.youtube = youtube;
    }

    await socialMedia.save();
    res.status(200).json(socialMedia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;