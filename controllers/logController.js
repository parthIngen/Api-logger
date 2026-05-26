const ApiLog = require('../models/ApiLog');

exports.createLog = async (req, res) => {
  try {
    let logData = req.body;

    // Clean undefined values (very important)
    logData = JSON.parse(JSON.stringify(logData)); // removes undefined

    // Ensure required fields
    logData.thresholdMs = logData.thresholdMs || 1000;

    const log = await ApiLog.create(logData);

    res.status(201).json({ 
      success: true, 
      logId: log._id 
    });
  } catch (error) {
    console.error('=== Logger Save Error ===');
    console.error('Error Message:', error.message);
    console.error('Error Name:', error.name);
    if (error.errors) console.error('Validation Errors:', error.errors);
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to save log',
      details: error.message   // ← Temporarily send real error for debugging
    });
  }
};