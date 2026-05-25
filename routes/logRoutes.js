const express = require('express');
const router = express.Router();
const { createLog } = require('../controllers/logController');

router.post('/logs', createLog);

module.exports = router;