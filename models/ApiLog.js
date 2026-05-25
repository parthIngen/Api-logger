const mongoose = require('mongoose');

const apiLogSchema = new mongoose.Schema({
  method: String,
  url: String,
  statusCode: Number,
  durationMs: Number,
  thresholdMs: { type: Number, default: 500 },
  ip: String,
  userId: { type: String, default: null },
  userRole: { type: String, default: null },
  token: String,
  requestHeaders: Object,
  queryParams: Object,
  routeParams: Object,
  requestBody: Object,
}, { timestamps: true });

module.exports = mongoose.model('ApiLog', apiLogSchema);