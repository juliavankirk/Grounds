const router = require('express').Router();
const getAllProducts, getProductById, createProduct, updateProduct, deleteProduct = require('../controllers/ProductController.js');
const isAdmin, protect = require('../middleware/auth.js');

router.route('/')
    .get(getAllProducts)
    .post(protect, isAdmin, createProduct)

router.route('/:id')
    .get(getProductById)
    .put(protect, isAdmin, updateProduct)
    .delete(protect, isAdmin, deleteProduct)

export default router