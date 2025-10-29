const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Bạn chưa đăng nhập, vui lòng đăng nhập' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findByPk(decoded.id, { attributes: { exclude: ['password'] } });

    if (!currentUser) {
      return res.status(401).json({ message: 'Người dùng không tồn tại' });
    }
    
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Bạn không có quyền truy cập vào tài nguyên này' });
  }
};