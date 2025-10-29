const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { protect, isAdmin } = require('../middleware/auth.middleware');

// Lấy danh sách sản phẩm
router.get('/', productController.getAllProducts);

// Lấy chi tiết sản phẩm
router.get('/:id', productController.getProductById);

// === ADMIN ROUTES ===
router.post('/', protect, isAdmin, productController.createProduct);
// router.put('/:id', protect, isAdmin, productController.updateProduct);
// router.delete('/:id', protect, isAdmin, productController.deleteProduct);

module.exports = router;