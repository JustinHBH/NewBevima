// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Tất cả user
router.get('/', userController.getAllUsers);
router.delete('/:id', userController.deleteUserById);

//khách hàng
router.post('/login', userController.getOneUser);
router.post('/register', userController.createCustomer);
router.get('/customer', userController.getCustomers);
router.get('/check-customer-email', userController.getCustomerByEmail);
router.post('/reset-password', userController.resetPassword);

//nhân viên (admin và employee)
router.get('/staff', userController.getAllStaff);
router.post('/create-staff', userController.createStaff);
router.get('/staff/:id', userController.getStaffById);
router.put('/staff/:id', userController.UpdateStaff);


module.exports = router;