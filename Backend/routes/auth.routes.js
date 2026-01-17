/**
 * Auth Routes
 * /api/auth
 */

const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { validateAuthInput, sanitizeInput } = require('../middleware/validation.middleware');

const router = express.Router();

/**
 * Public routes
 */
router.post('/register', sanitizeInput, validateAuthInput, authController.register);
router.post('/login', sanitizeInput, validateAuthInput, authController.login);

/**
 * Protected routes
 */
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;
