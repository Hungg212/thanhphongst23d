// backend/routes/category.routes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
// (Sau này có thể thêm middleware isAdmin cho route tạo/sửa/xóa)

/**
 * @swagger
 * tags:
 * - name: Categories
 * description: Quản lý danh mục sản phẩm
 */

/**
 * @swagger
 * /api/categories:
 * get:
 * summary: Lấy danh sách tất cả danh mục
 * tags: [Categories]
 * responses:
 * '200':
 * description: Danh sách danh mục
 */
router.get('/', categoryController.getAllCategories);

module.exports = router;