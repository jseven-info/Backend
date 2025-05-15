// models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },        // ✅ Match frontend field
  status: { type: String, required: true },
  startDate: { type: Date, default: null },
  endDate: { type: Date, default: null }
});

module.exports = mongoose.model('Project', projectSchema);
