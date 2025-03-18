const mongoose = require('mongoose');

const InterestedTopicSchema = new mongoose.Schema({
  topics: { type: [String], required: true },
});

module.exports = mongoose.model('InterestedTopic', InterestedTopicSchema);