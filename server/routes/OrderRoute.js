const router = require('express').Router();
const createOrder, getMyOrders, getAllOrders, getOrderById, updateOrderToPaid = require('../controllers/orderController');
const isAdmin, protect = require('../middleware/auth.js');

router.route('/')
    .get(protect, isAdmin, getAllOrders)
    .post(protect, createOrder)

router.get('/myorders', protect, getMyOrders)

router.route('/:id')
    .get(protect, getOrderById)

router.put('/:id/pay', protect, updateOrderToPaid)

export default router