/**
 * Auth Routes
 * /api/auth
 */

const express = require('express');
const authController = require('../controllers/auth.controller');
const tokenController = require('../controllers/token.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { validateAuthInput, sanitizeInput } = require('../middleware/validation.middleware');

const router = express.Router();

/**
 * Public routes
 */
router.post('/register', sanitizeInput, validateAuthInput, authController.register);
router.post('/login', sanitizeInput, validateAuthInput, authController.login);
router.post('/refresh-token', tokenController.refreshAccessToken);
router.post('/logout', tokenController.logout);

/**
 * Protected routes
 */
router.get('/profile', authMiddleware, authController.getProfile);
router.post('/logout-all', authMiddleware, tokenController.logoutAll);

module.exports = router;
