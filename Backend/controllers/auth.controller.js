/**
 * Auth Controller
 * Handles authentication operations (register, login, profile)
 */

const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const RefreshToken = require('../models/token.model');
const { success, error } = require('../utils/response');

/**
 * Register new user
 * POST /api/auth/register
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json(
        error(400, 'Name, email, and password are required.')
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json(
        error(400, 'Please enter a valid email address.')
      );
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json(
        error(400, 'Password must be at least 6 characters long.')
      );
    }

    // Check if user already exists (case-insensitive)
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json(
        error(409, 'This email is already registered. Please login or use a different email.')
      );
    }

    // Create new user with lowercase email for consistency
    const user = await User.create({ name, email: email.toLowerCase(), password });

    // Generate short-lived access token (15-30 min)
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' } // Short-lived
    );

    // Generate long-lived refresh token (7 days)
    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Store refresh token in database
    await RefreshToken.create(user.id, refreshToken, 7 * 24 * 60 * 60);

    return res.status(201).json(
      success(201, 'User registered successfully.', {
        accessToken,
        refreshToken,
        expiresIn: '15m',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.created_at,
        },
      })
    );
  } catch (err) {
    console.error('Registration error:', err);
    const errorMessage = err.message || 'An error occurred during registration.';
    return res.status(500).json(
      error(500, errorMessage)
    );
  }
};

/**
 * Login user
 * POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json(
        error(400, 'Email and password are required.')
      );
    }

    // Find user by email (case-insensitive)
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json(
        error(401, 'Invalid email or password. Please check your credentials or create a new account.')
      );
    }

    // Verify password
    const isPasswordValid = await User.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json(
        error(401, 'Invalid email or password.')
      );
    }

    // Generate short-lived access token (15-30 min)
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' } // Short-lived
    );

    // Generate long-lived refresh token (7 days)
    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Store refresh token in database
    await RefreshToken.create(user.id, refreshToken, 7 * 24 * 60 * 60);

    return res.status(200).json(
      success(200, 'Login successful.', {
        accessToken,
        refreshToken,
        expiresIn: '15m',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.created_at,
        },
      })
    );
  } catch (err) {
    console.error('Login error:', err);
    const errorMessage = err.message || 'An error occurred during login.';
    return res.status(500).json(
      error(500, errorMessage)
    );
  }
};

/**
 * Get user profile
 * GET /api/auth/profile
 */
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(
        error(404, 'User not found.')
      );
    }

    return res.status(200).json(
      success(200, 'Profile retrieved successfully.', user)
    );
  } catch (err) {
    console.error('Get profile error:', err);
    return res.status(500).json(
      error(500, 'An error occurred while retrieving profile.')
    );
  }
};

module.exports = {
  register,
  login,
  getProfile,
};
