const express = require('express');
const router = express.Router();
const PreferredLanguage = require('../models/PreferredLanguage');

// Get Preferred Languages
router.get('/', async (req, res) => {
  try {
    const preferredLanguage = await PreferredLanguage.findOne();
    res.status(200).json(preferredLanguage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Preferred Languages
router.post('/', async (req, res) => {
  try {
    const { languages } = req.body;

    let preferredLanguage = await PreferredLanguage.findOne();
    if (!preferredLanguage) {
      preferredLanguage = new PreferredLanguage({
        languages,
      });
    } else {
      preferredLanguage.languages = languages;
    }

    await preferredLanguage.save();
    res.status(200).json(preferredLanguage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;