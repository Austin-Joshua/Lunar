/**
 * Token Controller
 * Handles JWT access token refresh and token management
 */

const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/token.model');
const { success, error } = require('../utils/response');

/**
 * Refresh access token using refresh token
 * POST /api/auth/refresh-token
 */
const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json(
        error(401, 'Refresh token is required')
      );
    }

    // Verify refresh token in database
    const tokenData = await RefreshToken.verify(refreshToken);

    if (!tokenData) {
      return res.status(401).json(
        error(401, 'Invalid or expired refresh token')
      );
    }

    // Generate new access token
    const newAccessToken = jwt.sign(
      { 
        id: tokenData.id, 
        email: tokenData.email, 
        role: tokenData.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '15m' }
    );

    return res.status(200).json(
      success(200, 'Token refreshed successfully', {
        accessToken: newAccessToken,
        expiresIn: process.env.JWT_EXPIRE || '15m',
      })
    );
  } catch (err) {
    console.error('Token refresh error:', err);
    return res.status(500).json(
      error(500, 'Failed to refresh token')
    );
  }
};

/**
 * Logout user (revoke refresh token)
 * POST /api/auth/logout
 */
const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      await RefreshToken.revoke(refreshToken);
    }

    return res.status(200).json(
      success(200, 'Logged out successfully')
    );
  } catch (err) {
    console.error('Logout error:', err);
    return res.status(500).json(
      error(500, 'Failed to logout')
    );
  }
};

/**
 * Logout from all devices
 * POST /api/auth/logout-all
 */
const logoutAll = async (req, res) => {
  try {
    const userId = req.user.id;

    await RefreshToken.revokeAllForUser(userId);

    return res.status(200).json(
      success(200, 'Logged out from all devices')
    );
  } catch (err) {
    console.error('Logout all error:', err);
    return res.status(500).json(
      error(500, 'Failed to logout from all devices')
    );
  }
};

module.exports = {
  refreshAccessToken,
  logout,
  logoutAll,
};
