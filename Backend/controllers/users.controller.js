/**
 * Users Controller
 * Handles user operations (admin only)
 */

const User = require('../models/user.model');
const { success, error } = require('../utils/response');

/**
 * Get all users (admin only)
 * GET /api/users
 */
const getAll = async (req, res) => {
  try {
    const users = await User.getAll();

    return res.status(200).json(
      success(200, 'Users retrieved successfully.', users)
    );
  } catch (err) {
    console.error('Get all users error:', err);
    return res.status(500).json(
      error(500, 'An error occurred while retrieving users.')
    );
  }
};

module.exports = {
  getAll,
};
