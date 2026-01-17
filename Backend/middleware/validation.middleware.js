/**
 * Input Validation Middleware
 * Validates request data before it reaches controllers
 */

const { error } = require('../utils/response');

/**
 * Validate email format
 */
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password (minimum 6 characters)
 */
const validatePassword = (password) => {
  return password && password.length >= 6;
};

/**
 * Validate auth input (register/login)
 */
const validateAuthInput = (req, res, next) => {
  const { email, password, name } = req.body;

  // Check required fields
  if (!email || !password) {
    return res.status(400).json(
      error(400, 'Email and password are required')
    );
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json(
      error(400, 'Invalid email format')
    );
  }

  // Validate password length
  if (!validatePassword(password)) {
    return res.status(400).json(
      error(400, 'Password must be at least 6 characters')
    );
  }

  // For registration, validate name
  if (req.path.includes('register') && !name) {
    return res.status(400).json(
      error(400, 'Name is required for registration')
    );
  }

  next();
};

/**
 * Validate product input
 */
const validateProductInput = (req, res, next) => {
  const { name, brand, description, price, stock } = req.body;

  // Check required fields
  if (!name || !brand || !description || price === undefined || stock === undefined) {
    return res.status(400).json(
      error(400, 'All product fields are required')
    );
  }

  // Validate price > 0
  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json(
      error(400, 'Price must be a positive number')
    );
  }

  // Validate stock >= 0
  if (typeof stock !== 'number' || stock < 0) {
    return res.status(400).json(
      error(400, 'Stock cannot be negative')
    );
  }

  // Validate string lengths
  if (name.length < 3 || name.length > 255) {
    return res.status(400).json(
      error(400, 'Product name must be 3-255 characters')
    );
  }

  if (description.length < 10) {
    return res.status(400).json(
      error(400, 'Description must be at least 10 characters')
    );
  }

  next();
};

/**
 * Validate order input
 */
const validateOrderInput = (req, res, next) => {
  const { items } = req.body;

  // Check items array
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json(
      error(400, 'Order must contain at least one item')
    );
  }

  // Validate each item
  for (const item of items) {
    if (!item.productId || !item.quantity || item.price === undefined) {
      return res.status(400).json(
        error(400, 'Each item must have productId, quantity, and price')
      );
    }

    if (item.quantity <= 0) {
      return res.status(400).json(
        error(400, 'Item quantity must be greater than 0')
      );
    }

    if (item.price < 0) {
      return res.status(400).json(
        error(400, 'Item price cannot be negative')
      );
    }
  }

  next();
};

/**
 * Sanitize input (basic XSS protection)
 */
const sanitizeInput = (req, res, next) => {
  const sanitize = (obj) => {
    if (typeof obj !== 'object' || obj === null) return obj;

    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'string') {
        // Remove potentially harmful characters
        obj[key] = obj[key]
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .trim();
      } else if (typeof obj[key] === 'object') {
        sanitize(obj[key]);
      }
    });
  };

  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);

  next();
};

module.exports = {
  validateAuthInput,
  validateProductInput,
  validateOrderInput,
  sanitizeInput,
  validateEmail,
  validatePassword,
};
