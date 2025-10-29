'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Một Product thuộc về một Category
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category'
      });
      
      // Một Product có nhiều Biến thể (ProductVariants)
      Product.hasMany(models.ProductVariant, {
        foreignKey: 'productId',
        as: 'variants'
      });
    }
  }
  Product.init({
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    brand: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};