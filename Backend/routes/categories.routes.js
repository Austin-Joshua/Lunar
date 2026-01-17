/**
 * Categories Routes
 * /api/categories
 */

const express = require('express');
const categoriesController = require('../controllers/categories.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

const router = express.Router();

/**
 * Public routes
 */

// Get all categories
router.get('/', categoriesController.getAll);

// Get categories by gender
router.get('/:gender', categoriesController.getByGender);

/**
 * Admin routes (protected)
 */

// Create category
router.post('/', authMiddleware, adminMiddleware, categoriesController.create);

module.exports = router;
