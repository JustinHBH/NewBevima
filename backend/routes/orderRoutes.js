const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/create-order', orderController.createOrder);
router.get('/history/:userId', orderController.getOrderHistory);
router.put('/update/:orderId', orderController.updateOrderbyId);
router.delete('/:orderId', orderController.deleteOrder);
router.get('/get/:orderId', orderController.getOrderById);
router.get('/get', orderController.getAllOrder);
router.get('/getByDate', orderController.getOrderByDate);


module.exports = router;
