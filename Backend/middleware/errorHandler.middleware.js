/**
 * Global Error Handler Middleware
 * Catches all errors and returns standardized responses
 * Should be added LAST in middleware chain
 */

const { error } = require('../utils/response');

/**
 * Error handling middleware
 * Catches all errors thrown in routes/controllers
 * 
 * Usage: app.use(errorHandler) - must be LAST middleware
 */
const errorHandler = (err, req, res, next) => {
  // Log error for debugging (in production, use proper logging service)
  console.error(`❌ Error [${new Date().toISOString()}]:`, {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Extract status code and message
  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'An unexpected error occurred';

  // Send standardized error response
  return res.status(statusCode).json(
    error(statusCode, message, {
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    })
  );
};

/**
 * Async route wrapper to catch errors
 * Usage: router.get('/path', asyncHandler(controller))
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * 404 handler
 * Should be added after all routes
 */
const notFoundHandler = (req, res) => {
  return res.status(404).json(
    error(404, `Route not found: ${req.method} ${req.path}`)
  );
};

module.exports = {
  errorHandler,
  asyncHandler,
  notFoundHandler,
};
