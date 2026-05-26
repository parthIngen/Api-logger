const ApiLog = require('../models/ApiLog');

exports.createLog = async (req, res) => {
  try {
    const logData = {
      method: req.body.method,
      url: req.body.url,
      statusCode: req.body.statusCode,
      durationMs: req.body.durationMs,
      thresholdMs: req.body.thresholdMs || 1000,
      ip: req.body.ip || null,
      userId: req.body.userId || null,
      userRole: req.body.userRole || null,
      token: req.body.token || null,
      requestHeaders: req.body.requestHeaders || {},
      queryParams: req.body.queryParams || {},
      routeParams: req.body.routeParams || {},
      requestBody: req.body.requestBody || {},
      isSlow: (req.body.durationMs || 0) > (req.body.thresholdMs || 1000)
    };

    const log = await ApiLog.create(logData);

    res.status(201).json({ 
      success: true, 
      logId: log._id,
      message: "Log saved successfully"
    });
  } catch (error) {
    console.error('Logger Save Error:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to save log',
      details: error.message 
    });
  }
};