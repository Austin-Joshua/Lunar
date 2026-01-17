/**
 * Orders Routes
 * /api/orders
 */

const express = require('express');
const ordersController = require('../controllers/orders.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

const router = express.Router();

/**
 * Protected routes (authenticated users)
 */

// Create order
router.post('/', authMiddleware, ordersController.create);

// Get user's orders
router.get('/my-orders', authMiddleware, ordersController.getMyOrders);

// Get order by ID
router.get('/:id', authMiddleware, ordersController.getById);

/**
 * Admin routes (protected)
 */

// Get all orders (admin only)
router.get('/', authMiddleware, adminMiddleware, ordersController.getAll);

// Update order status (admin only)
router.put('/:id/status', authMiddleware, adminMiddleware, ordersController.updateStatus);

module.exports = router;
