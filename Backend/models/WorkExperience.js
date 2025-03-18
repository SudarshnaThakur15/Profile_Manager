const mongoose = require('mongoose');

const WorkExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String },
});

module.exports = mongoose.model('WorkExperience', WorkExperienceSchema);