/**
 * OAuth Routes
 * /api/auth/oauth/*
 */

const express = require('express');
const oauthController = require('../controllers/oauth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

/**
 * Google OAuth
 */
router.post('/google/callback', oauthController.googleCallback);

/**
 * Apple OAuth
 */
router.post('/apple/callback', oauthController.appleCallback);

/**
 * Link social account to existing user
 * Requires authentication
 */
router.post('/link-social', authMiddleware, oauthController.linkSocialAccount);

module.exports = router;
