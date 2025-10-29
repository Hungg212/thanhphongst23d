// backend/controllers/category.controller.js
const db = require('../models');
const Category = db.Category;

// Lấy tất cả danh mục
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      order: [['name', 'ASC']] // Sắp xếp theo tên
    });
    res.status(200).json({ status: 'success', data: categories });
  } catch (error) {
    next(error);
  }
};