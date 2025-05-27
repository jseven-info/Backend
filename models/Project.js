const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  startDate: { type: Date, required: false, default: null },
  endDate: { type: Date, required: false, default: null }
});

module.exports = mongoose.model('Project', projectSchema);
