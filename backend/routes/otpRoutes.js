//otpRouttes.js
const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpContoller');

router.post('/send-otp', otpController.sendOtp);
router.post('/verify-otp', otpController.verifyOtp);

module.exports = router;
