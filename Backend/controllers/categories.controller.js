/**
 * Categories Controller
 * Handles category operations (get, create)
 */

const Category = require('../models/category.model');
const { success, error } = require('../utils/response');

/**
 * Get all categories
 * GET /api/categories
 */
const getAll = async (req, res) => {
  try {
    const categories = await Category.getAll();

    return res.status(200).json(
      success(200, 'Categories retrieved successfully.', categories)
    );
  } catch (err) {
    console.error('Get all categories error:', err);
    return res.status(500).json(
      error(500, 'An error occurred while retrieving categories.')
    );
  }
};

/**
 * Get categories by gender
 * GET /api/categories/:gender
 */
const getByGender = async (req, res) => {
  try {
    const { gender } = req.params;

    const validGenders = ['men', 'women', 'kids'];
    if (!validGenders.includes(gender)) {
      return res.status(400).json(
        error(400, 'Invalid gender. Must be men, women, or kids.')
      );
    }

    const categories = await Category.getByGender(gender);

    return res.status(200).json(
      success(200, 'Categories retrieved successfully.', categories)
    );
  } catch (err) {
    console.error('Get categories by gender error:', err);
    return res.status(500).json(
      error(500, 'An error occurred while retrieving categories.')
    );
  }
};

/**
 * Create category (admin only)
 * POST /api/categories
 */
const create = async (req, res) => {
  try {
    const { name, gender } = req.body;

    // Validate input
    if (!name || !gender) {
      return res.status(400).json(
        error(400, 'Name and gender are required.')
      );
    }

    // Validate gender
    const validGenders = ['men', 'women', 'kids'];
    if (!validGenders.includes(gender)) {
      return res.status(400).json(
        error(400, 'Invalid gender. Must be men, women, or kids.')
      );
    }

    // Check if category already exists
    const existing = await Category.findByNameAndGender(name, gender);
    if (existing) {
      return res.status(409).json(
        error(409, 'Category already exists for this gender.')
      );
    }

    // Create category
    const category = await Category.create({ name, gender });

    return res.status(201).json(
      success(201, 'Category created successfully.', category)
    );
  } catch (err) {
    console.error('Create category error:', err);
    return res.status(500).json(
      error(500, 'An error occurred while creating the category.')
    );
  }
};

module.exports = {
  getAll,
  getByGender,
  create,
};
