/**
 * Consistent API Response Utility
 * Standardizes all JSON responses across the API
 */

/**
 * Success response wrapper
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Response message
 * @param {any} data - Response data payload
 * @returns {object} Formatted success response
 */
const success = (statusCode, message, data = null) => ({
  success: true,
  message,
  data,
  timestamp: new Date().toISOString(),
});

/**
 * Error response wrapper
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {any} errors - Error details
 * @returns {object} Formatted error response
 */
const error = (statusCode, message, errors = null) => ({
  success: false,
  message,
  errors,
  timestamp: new Date().toISOString(),
});

module.exports = {
  success,
  error,
};
