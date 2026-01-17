/**
 * Products Routes
 * /api/products
 */

const express = require('express');
const productsController = require('../controllers/products.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

const router = express.Router();

/**
 * Public routes
 */

// Search products
router.get('/search', productsController.search);

// Get all products
router.get('/', productsController.getAll);

// Get products by gender and category
router.get('/:gender/:category', productsController.getByGenderAndCategory);

// Get products by gender
router.get('/:gender', productsController.getByGender);

// Get product by ID
router.get('/:id', productsController.getById);

/**
 * Admin routes (protected)
 */

// Create product
router.post('/', authMiddleware, adminMiddleware, productsController.create);

// Update product
router.put('/:id', authMiddleware, adminMiddleware, productsController.update);

// Delete product
router.delete('/:id', authMiddleware, adminMiddleware, productsController.deleteProduct);

module.exports = router;
