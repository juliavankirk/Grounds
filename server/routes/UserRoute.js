const router = require('express').Router();
const authUser, registerUser, getUserProfile, updateUserProfile, getAllUsers, getUserById, updateUser, deleteUser = require('../controllers/UserController.js');
const OrderRoutes = require('./OrderRoutes.js');
const isAdmin, protect = require('../middleware/auth.js');

// Re-route into the order routers
router.use('/:userId/orders', protect, isAdmin, OrderRoutes)

router.route('/')
    .get(protect, isAdmin, getAllUsers)
    .post(registerUser)

router.post('/login', authUser)

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router.route('/:id')
    .get(protect, isAdmin, getUserById)
    .put(protect, isAdmin, updateUser)
    .delete(protect, isAdmin, deleteUser)

export default router