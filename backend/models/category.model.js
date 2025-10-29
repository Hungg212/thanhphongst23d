'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Một Category có nhiều Sản phẩm (Products)
      Category.hasMany(models.Product, {
        foreignKey: 'categoryId',
        as: 'products'
      });
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};