const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  console.log('🔐 Backend Auth - Headers:', req.headers);

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log('🔐 Backend Auth - Token found:', token ? 'YES' : 'NO');
  }

  if (!token) {
    console.log('🔐 Backend Auth - No token provided');
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }

  try {
    console.log('🔐 Backend Auth - Verifying token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('🔐 Backend Auth - Token decoded:', decoded);
    
    req.user = await User.findById(decoded.id);
    console.log('🔐 Backend Auth - User found:', req.user ? 'YES' : 'NO');
    
    if (!req.user) {
      console.log('🔐 Backend Auth - User not found in database');
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    console.log('🔐 Backend Auth - Authentication successful');
    next();
  } catch (error) {
    console.error('🔐 Backend Auth - Token verification failed:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};