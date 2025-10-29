'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      // Một Chi tiết đơn hàng thuộc về một Đơn hàng
      OrderItem.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order'
      });
      
      // Một Chi tiết đơn hàng thuộc về một Biến thể sản phẩm
      OrderItem.belongsTo(models.ProductVariant, {
        foreignKey: 'productVariantId',
        as: 'productVariant'
      });
    }
  }
  OrderItem.init({
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    productVariantId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false } // Giá tại thời điểm mua
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};