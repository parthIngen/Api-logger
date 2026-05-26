const mongoose = require('mongoose');

const apiLogSchema = new mongoose.Schema({
  method: { type: String, required: true },
  url: { type: String, required: true },
  statusCode: { type: Number, required: true },
  durationMs: { type: Number, required: true },
  thresholdMs: { type: Number, default: 1000 },
  ip: String,
  userId: String,
  userRole: String,
  token: String,
  requestHeaders: { type: Object, default: {} },
  queryParams: { type: Object, default: {} },
  routeParams: { type: Object, default: {} },
  requestBody: { type: Object, default: {} },
  isSlow: { type: Boolean, default: false }
}, { 
  timestamps: true 
});

// We are removing the pre hook temporarily to fix the error
// You can add it back later once it's stable

module.exports = mongoose.model('ApiLog', apiLogSchema);