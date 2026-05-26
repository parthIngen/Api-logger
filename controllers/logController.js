const ApiLog = require('../models/ApiLog');

exports.createLog = async (req, res) => {
  try {
    const logData = req.body;

    // Minimal cleaning only - remove actual undefined values
    const cleanedData = {
      method: logData.method,
      url: logData.url,
      statusCode: logData.statusCode,
      durationMs: logData.durationMs,
      thresholdMs: logData.thresholdMs || 1000,
      ip: logData.ip || null,
      userId: logData.userId || null,
      userRole: logData.userRole || null,
      token: logData.token || null,
      requestHeaders: logData.requestHeaders || {},
      queryParams: logData.queryParams || {},
      routeParams: logData.routeParams || {},
      requestBody: logData.requestBody || {}
    };

    const log = await ApiLog.create(cleanedData);

    res.status(201).json({ 
      success: true, 
      logId: log._id 
    });
  } catch (error) {
    console.error('=== Logger Save Error ===');
    console.error('Error Message:', error.message);
    if (error.errors) {
      console.error('Validation Errors:', JSON.stringify(error.errors, null, 2));
    }

    res.status(500).json({ 
      success: false, 
      error: 'Failed to save log',
      details: error.message 
    });
  }
};