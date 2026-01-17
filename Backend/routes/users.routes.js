/**
 * Users Routes
 * /api/users
 */

const express = require('express');
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

const router = express.Router();

/**
 * Admin routes (protected)
 */

// Get all users (admin only)
router.get('/', authMiddleware, adminMiddleware, usersController.getAll);

module.exports = router;
