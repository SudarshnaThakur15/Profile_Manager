const mongoose = require('mongoose');

const PreferredLanguageSchema = new mongoose.Schema({
  languages: { type: [String], required: true },
});

module.exports = mongoose.model('PreferredLanguage', PreferredLanguageSchema);