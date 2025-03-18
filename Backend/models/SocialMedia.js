const mongoose = require('mongoose');

const SocialMediaSchema = new mongoose.Schema({
  linkedin: { type: String, required: true },
  x: { type: String, required: true },
  gmail: { type: String, required: true },
  youtube: { type: String, required: true },
});

module.exports = mongoose.model('SocialMedia', SocialMediaSchema);