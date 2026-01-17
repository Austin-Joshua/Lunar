/**
 * Auth Controller
 * Handles authentication operations (register, login, profile)
 */

const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
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

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json(
        error(409, 'User with this email already exists.')
      );
    }

    // Create new user
    const user = await User.create({ name, email, password });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    return res.status(201).json(
      success(201, 'User registered successfully.', {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
      })
    );
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json(
      error(500, 'An error occurred during registration.')
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

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json(
        error(401, 'Invalid email or password.')
      );
    }

    // Verify password
    const isPasswordValid = await User.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json(
        error(401, 'Invalid email or password.')
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    return res.status(200).json(
      success(200, 'Login successful.', {
        token,
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
    return res.status(500).json(
      error(500, 'An error occurred during login.')
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
