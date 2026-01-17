/**
 * Products Controller
 * Handles product operations (get, create, update, delete)
 */

const Product = require('../models/product.model');
const Category = require('../models/category.model');
const { success, error } = require('../utils/response');

/**
 * Get all products
 * GET /api/products
 */
const getAll = async (req, res) => {
  try {
    const products = await Product.getAll();
    
    return res.status(200).json(
      success(200, 'Products retrieved successfully.', products)
    );
  } catch (err) {
    console.error('Get all products error:', err);
    return res.status(500).json(
      error(500, 'An error occurred while retrieving products.')
    );
  }
};

/**
 * Get product by ID
 * GET /api/products/:id
 */
const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.getById(id);
    if (!product) {
      return res.status(404).json(
        error(404, 'Product not found.')
      );
    }

    return res.status(200).json(
      success(200, 'Product retrieved successfully.', product)
    );
  } catch (err) {
    console.error('Get product by ID error:', err);
    return res.status(500).json(
      error(500, 'An error occurred while retrieving the product.')
    );
  }
};

/**
 * Get products by gender
 * GET /api/products/:gender
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

    const products = await Product.getByGender(gender);

    return res.status(200).json(
      success(200, 'Products retrieved successfully.', products)
    );
  } catch (err) {
    console.error('Get products by gender error:', err);
    return res.status(500).json(
      error(500, 'An error occurred while retrieving products.')
    );
  }
};

/**
 * Get products by gender and category
 * GET /api/products/:gender/:category
 */
const getByGenderAndCategory = async (req, res) => {
  try {
    const { gender, category } = req.params;

    const validGenders = ['men', 'women', 'kids'];
    if (!validGenders.includes(gender)) {
      return res.status(400).json(
        error(400, 'Invalid gender. Must be men, women, or kids.')
      );
    }

    const products = await Product.getByGenderAndCategory(gender, category);

    return res.status(200).json(
      success(200, 'Products retrieved successfully.', products)
    );
  } catch (err) {
    console.error('Get products by gender and category error:', err);
    return res.status(500).json(
      error(500, 'An error occurred while retrieving products.')
    );
  }
};

/**
 * Search products
 * GET /api/products/search?q=query
 */
const search = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json(
        error(400, 'Search query is required.')
      );
    }

    const products = await Product.search(q);

    return res.status(200).json(
      success(200, 'Search completed successfully.', products)
    );
  } catch (err) {
    console.error('Search products error:', err);
    return res.status(500).json(
      error(500, 'An error occurred while searching products.')
    );
  }
};

/**
 * Create product (admin only)
 * POST /api/products
 */
const create = async (req, res) => {
  try {
    const { name, brand, description, gender, category, price, stock, image_url } = req.body;

    // Validate input
    if (!name || !brand || !description || !gender || !category || !price || stock === undefined || !image_url) {
      return res.status(400).json(
        error(400, 'All fields are required.')
      );
    }

    // Validate gender
    const validGenders = ['men', 'women', 'kids'];
    if (!validGenders.includes(gender)) {
      return res.status(400).json(
        error(400, 'Invalid gender.')
      );
    }

    // Find or create category
    let categoryData = await Category.findByNameAndGender(category, gender);
    let categoryId = categoryData?.id;

    if (!categoryId) {
      const newCategory = await Category.create({ name: category, gender });
      categoryId = newCategory.id;
    }

    // Create product
    const product = await Product.create({
      name,
      brand,
      description,
      gender,
      category_id: categoryId,
      price: parseFloat(price),
      stock: parseInt(stock),
      image_url,
    });

    return res.status(201).json(
      success(201, 'Product created successfully.', product)
    );
  } catch (err) {
    console.error('Create product error:', err);
    return res.status(500).json(
      error(500, 'An error occurred while creating the product.')
    );
  }
};

/**
 * Update product (admin only)
 * PUT /api/products/:id
 */
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if product exists
    const product = await Product.getById(id);
    if (!product) {
      return res.status(404).json(
        error(404, 'Product not found.')
      );
    }

    // Update product
    const updatedProduct = await Product.update(id, updates);

    return res.status(200).json(
      success(200, 'Product updated successfully.', updatedProduct)
    );
  } catch (err) {
    console.error('Update product error:', err);
    return res.status(500).json(
      error(500, 'An error occurred while updating the product.')
    );
  }
};

/**
 * Delete product (admin only)
 * DELETE /api/products/:id
 */
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product exists
    const product = await Product.getById(id);
    if (!product) {
      return res.status(404).json(
        error(404, 'Product not found.')
      );
    }

    // Delete product
    const deleted = await Product.delete(id);

    if (deleted) {
      return res.status(200).json(
        success(200, 'Product deleted successfully.')
      );
    } else {
      return res.status(500).json(
        error(500, 'Failed to delete product.')
      );
    }
  } catch (err) {
    console.error('Delete product error:', err);
    return res.status(500).json(
      error(500, 'An error occurred while deleting the product.')
    );
  }
};

module.exports = {
  getAll,
  getById,
  getByGender,
  getByGenderAndCategory,
  search,
  create,
  update,
  deleteProduct,
};
