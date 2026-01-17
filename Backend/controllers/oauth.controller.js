/**
 * OAuth Controller
 * Handles Google and Apple OAuth authentication
 */

const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { success, error } = require('../utils/response');

/**
 * Handle Google OAuth callback
 * POST /api/auth/google/callback
 */
const googleCallback = async (req, res) => {
  try {
    const { id, email, name, picture } = req.body;

    if (!email) {
      return res.status(400).json(
        error(400, 'Email is required from Google account')
      );
    }

    // Check if user exists
    let user = await User.findByEmail(email);

    if (!user) {
      // Create new user from Google data
      user = await User.create({
        name: name || email.split('@')[0],
        email,
        password: generateRandomPassword(), // OAuth users have random password
        oauthProvider: 'google',
        oauthId: id,
        profileImage: picture,
      });
    } else if (!user.oauthId || user.oauthProvider !== 'google') {
      // Link Google account to existing user
      await User.updateOAuthData(user.id, 'google', id, picture);
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    return res.status(200).json(
      success(200, 'Google login successful', {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage,
        },
      })
    );
  } catch (err) {
    console.error('Google OAuth error:', err);
    return res.status(500).json(
      error(500, 'Google authentication failed')
    );
  }
};

/**
 * Handle Apple OAuth callback
 * POST /api/auth/apple/callback
 */
const appleCallback = async (req, res) => {
  try {
    const { sub, email, name, picture } = req.body;

    if (!email || !sub) {
      return res.status(400).json(
        error(400, 'Email and user ID are required from Apple account')
      );
    }

    // Check if user exists
    let user = await User.findByEmail(email);

    if (!user) {
      // Create new user from Apple data
      user = await User.create({
        name: name || email.split('@')[0],
        email,
        password: generateRandomPassword(), // OAuth users have random password
        oauthProvider: 'apple',
        oauthId: sub,
        profileImage: picture,
      });
    } else if (!user.oauthId || user.oauthProvider !== 'apple') {
      // Link Apple account to existing user
      await User.updateOAuthData(user.id, 'apple', sub, picture);
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    return res.status(200).json(
      success(200, 'Apple login successful', {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage,
        },
      })
    );
  } catch (err) {
    console.error('Apple OAuth error:', err);
    return res.status(500).json(
      error(500, 'Apple authentication failed')
    );
  }
};

/**
 * Link social account to existing user
 * POST /api/auth/link-social
 */
const linkSocialAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { provider, id, picture } = req.body;

    if (!['google', 'apple'].includes(provider)) {
      return res.status(400).json(
        error(400, 'Invalid OAuth provider')
      );
    }

    await User.updateOAuthData(userId, provider, id, picture);

    return res.status(200).json(
      success(200, `${provider} account linked successfully`)
    );
  } catch (err) {
    console.error('Link social account error:', err);
    return res.status(500).json(
      error(500, 'Failed to link social account')
    );
  }
};

/**
 * Generate random password for OAuth users
 */
const generateRandomPassword = () => {
  return Math.random().toString(36).slice(-15) + Math.random().toString(36).slice(-15);
};

module.exports = {
  googleCallback,
  appleCallback,
  linkSocialAccount,
};
