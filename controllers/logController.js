const ApiLog = require('../models/ApiLog');

exports.createLog = async (req, res) => {
  try {
    const logData = req.body;
    
    // Auto flag slow APIs
    if (logData.durationMs > (logData.thresholdMs || 1000)) {
      logData.isSlow = true;
    }

    const log = await ApiLog.create(logData);
    res.status(201).json({ success: true, logId: log._id });
  } catch (error) {
    console.error('Logger Error:', error);
    res.status(500).json({ success: false, error: 'Failed to save log' });
  }
};