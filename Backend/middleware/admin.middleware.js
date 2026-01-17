/**
 * Admin Authorization Middleware
 * Verifies user has admin role
 */

const { error } = require('../utils/response');

/**
 * Admin middleware - checks if user is admin
 * Should be used after authMiddleware
 */
const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json(
      error(401, 'Unauthorized. Please login first.')
    );
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json(
      error(403, 'Forbidden. Admin access required.')
    );
  }

  next();
};

module.exports = adminMiddleware;
