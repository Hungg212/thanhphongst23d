const db = require('../models');
const User = db.User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hàm tạo token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// Đăng ký
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // Hash password đã được xử lý tự động bởi hook trong model User
    const newUser = await User.create({ name, email, password });
    
    const token = generateToken(newUser);
    res.status(201).json({
      status: 'success',
      token,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Email này đã tồn tại.' });
    }
    next(error);
  }
};

// Đăng nhập
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Vui lòng cung cấp email và mật khẩu' });
    }

    const user = await User.findOne({ where: { email } });

    // Dùng hàm comparePassword đã định nghĩa trong model
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    const token = generateToken(user);
    res.status(200).json({
      status: 'success',
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};