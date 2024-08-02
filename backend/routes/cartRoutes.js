// cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.addToCart);
router.put('/update', cartController.updateCartQuantity);
router.delete('/delete', cartController.removeFromCart);

module.exports = router;
