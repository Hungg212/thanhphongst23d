'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    
    // --- 1. Seed Users ---
    const adminPassword = await bcrypt.hash('admin123', salt);
    const userPassword = await bcrypt.hash('user123', salt);
    
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin User',
        email: 'admin@shop.com',
        password: adminPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Normal User',
        email: 'user@shop.com',
        password: userPassword,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // --- 2. Seed Categories ---
    await queryInterface.bulkInsert('Categories', [
      { name: 'Áo T-shirt', createdAt: new Date(), updatedAt: new Date() }, // id 1
      { name: 'Áo Sơ mi', createdAt: new Date(), updatedAt: new Date() }, // id 2
      { name: 'Quần Jeans', createdAt: new Date(), updatedAt: new Date() }  // id 3
    ], {});

    // Lấy ID của category
    const categories = await queryInterface.sequelize.query(
      `SELECT id, name FROM Categories;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const tShirtCatId = categories.find(c => c.name === 'Áo T-shirt').id;
    const jeansCatId = categories.find(c => c.name === 'Quần Jeans').id;
    
    // --- 3. Seed Products ---
    await queryInterface.bulkInsert('Products', [
      { // id 1
        name: 'Áo T-shirt Cổ tròn Basic',
        description: 'Áo T-shirt cotton 100%, thoáng mát, phù hợp mọi hoạt động.',
        brand: 'Coolmate',
        categoryId: tShirtCatId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { // id 2
        name: 'Quần Jeans Skinny Rách gối',
        description: 'Quần jeans co dãn, form skinny tôn dáng, chi tiết rách gối thời trang.',
        brand: 'Zara',
        categoryId: jeansCatId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Lấy ID của product
    const products = await queryInterface.sequelize.query(
      `SELECT id, name FROM Products;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const tShirtProductId = products.find(p => p.name === 'Áo T-shirt Cổ tròn Basic').id;
    const jeansProductId = products.find(p => p.name === 'Quần Jeans Skinny Rách gối').id;

    // --- 4. Seed ProductVariants ---
    await queryInterface.bulkInsert('ProductVariants', [
      // Biến thể cho Áo T-shirt (id 1)
      {
        productId: tShirtProductId,
        color: 'Trắng',
        size: 'M',
        price: 199000,
        stock: 50,
        image: 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/478002/sub/goods_478002_sub14_3x4.jpg?width=369',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: tShirtProductId,
        color: 'Trắng',
        size: 'L',
        price: 199000,
        stock: 30,
        image: 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/456589/item/goods_00_456589_3x4.jpg?width=369',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: tShirtProductId,
        color: 'Đen',
        size: 'M',
        price: 199000,
        stock: 40,
        image: 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/478064/item/goods_00_478064_3x4.jpg?width=369',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Biến thể cho Quần Jeans (id 2)
      {
        productId: jeansProductId,
        color: 'Xanh nhạt',
        size: '30',
        price: 499000,
        stock: 20,
        image: 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/478064/item/goods_00_478064_3x4.jpg?width=369',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: jeansProductId,
        color: 'Đen',
        size: '32',
        price: 529000,
        stock: 15,
        image: 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/478064/item/goods_00_478064_3x4.jpg?width=369',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Xóa theo thứ tự ngược lại
    await queryInterface.bulkDelete('ProductVariants', null, {});
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};