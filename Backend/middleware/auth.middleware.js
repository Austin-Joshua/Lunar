/**
 * Authentication Middleware
 * Verifies JWT token and extracts user data
 */

const jwt = require('jsonwebtoken');
const { error } = require('../utils/response');

/**
 * Auth middleware - verifies JWT token
 * Attached user data to req.user
 */
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json(
        error(401, 'Access denied. No token provided.')
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json(
      error(403, 'Invalid or expired token.')
    );
  }
};

module.exports = authMiddleware;
