// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/:id', profileController.getProfileByUserId);
router.put('/:id', profileController.updateProfileByUserId);
module.exports = router;
