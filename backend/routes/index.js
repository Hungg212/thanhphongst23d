const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const productRoutes = require('./product.routes');
// const orderRoutes = require('./order.routes');
const categoryRoutes = require('./category.routes');

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
// router.use('/orders', orderRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;