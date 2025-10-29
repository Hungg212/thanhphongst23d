'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    static associate(models) {
      // Một Biến thể thuộc về một Product
      ProductVariant.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      });
      
      // Một Biến thể có thể nằm trong nhiều Chi tiết đơn hàng (OrderItems)
      ProductVariant.hasMany(models.OrderItem, {
        foreignKey: 'productVariantId',
        as: 'orderItems'
      });
    }
  }
  ProductVariant.init({
    productId: { type: DataTypes.INTEGER, allowNull: false },
    color: DataTypes.STRING,
    size: DataTypes.STRING,
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductVariant',
  });
  return ProductVariant;
};