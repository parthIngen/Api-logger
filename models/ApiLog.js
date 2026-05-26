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

// Auto flag slow requests
apiLogSchema.pre('save', function(next) {
  if (this.durationMs > this.thresholdMs) {
    this.isSlow = true;
  }
  next();
});

module.exports = mongoose.model('ApiLog', apiLogSchema);