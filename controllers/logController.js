const ApiLog = require('../models/ApiLog');

exports.createLog = async (req, res) => {
  try {
    let logData = { ...req.body };

    // Deep clean: Remove undefined, null strings, and fix bad values
    const cleanObject = (obj) => {
      if (obj === null || obj === undefined) return null;
      if (typeof obj !== 'object') {
        return obj === "undefined" ? null : obj;
      }
      if (Array.isArray(obj)) {
        return obj.map(cleanObject);
      }
      const cleaned = {};
      for (const key in obj) {
        cleaned[key] = cleanObject(obj[key]);
      }
      return cleaned;
    };

    logData = cleanObject(logData);

    // Ensure required fields
    logData.thresholdMs = logData.thresholdMs || 1000;
    logData.requestHeaders = logData.requestHeaders || {};
    logData.queryParams = logData.queryParams || {};
    logData.routeParams = logData.routeParams || {};
    logData.requestBody = logData.requestBody || {};

    const log = await ApiLog.create(logData);

    res.status(201).json({ 
      success: true, 
      logId: log._id 
    });
  } catch (error) {
    console.error('=== Logger Save Error ===');
    console.error('Error:', error.message);
    if (error.errors) console.error('Validation:', error.errors);

    res.status(500).json({ 
      success: false, 
      error: 'Failed to save log',
      details: error.message 
    });
  }
};