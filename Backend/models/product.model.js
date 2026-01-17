/**
 * Product Model
 * Database operations for products
 */

const { pool } = require('../config/db');

class Product {
  /**
   * Get all products
   * @returns {array} Array of products
   */
  static async getAll() {
    const query = `
      SELECT 
        p.id, p.name, p.brand, p.price, p.description, 
        p.gender, p.category_id, c.name as category, p.stock, 
        p.image_url, p.created_at
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `;
    const [rows] = await pool.execute(query);

    return rows.map(row => ({
      id: row.id,
      name: row.name,
      brand: row.brand,
      price: parseFloat(row.price),
      description: row.description,
      gender: row.gender,
      category: row.category,
      stock: row.stock,
      image: row.image_url,
      inStock: row.stock > 0,
    }));
  }

  /**
   * Get product by ID
   * @param {number} id - Product ID
   * @returns {object} Product data or null
   */
  static async getById(id) {
    const query = `
      SELECT 
        p.id, p.name, p.brand, p.price, p.description, 
        p.gender, p.category_id, c.name as category, p.stock, 
        p.image_url, p.created_at
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `;
    const [rows] = await pool.execute(query, [id]);

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      id: row.id,
      name: row.name,
      brand: row.brand,
      price: parseFloat(row.price),
      description: row.description,
      gender: row.gender,
      category: row.category,
      stock: row.stock,
      image: row.image_url,
      inStock: row.stock > 0,
      createdAt: row.created_at,
    };
  }

  /**
   * Get products by gender
   * @param {string} gender - 'men', 'women', or 'kids'
   * @returns {array} Array of products
   */
  static async getByGender(gender) {
    const query = `
      SELECT 
        p.id, p.name, p.brand, p.price, p.description, 
        p.gender, p.category_id, c.name as category, p.stock, 
        p.image_url, p.created_at
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.gender = ?
      ORDER BY p.created_at DESC
    `;
    const [rows] = await pool.execute(query, [gender]);

    return rows.map(row => ({
      id: row.id,
      name: row.name,
      brand: row.brand,
      price: parseFloat(row.price),
      description: row.description,
      gender: row.gender,
      category: row.category,
      stock: row.stock,
      image: row.image_url,
      inStock: row.stock > 0,
    }));
  }

  /**
   * Get products by gender and category
   * @param {string} gender - 'men', 'women', or 'kids'
   * @param {string} category - Category name
   * @returns {array} Array of products
   */
  static async getByGenderAndCategory(gender, category) {
    const query = `
      SELECT 
        p.id, p.name, p.brand, p.price, p.description, 
        p.gender, p.category_id, c.name as category, p.stock, 
        p.image_url, p.created_at
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.gender = ? AND c.name = ?
      ORDER BY p.created_at DESC
    `;
    const [rows] = await pool.execute(query, [gender, category]);

    return rows.map(row => ({
      id: row.id,
      name: row.name,
      brand: row.brand,
      price: parseFloat(row.price),
      description: row.description,
      gender: row.gender,
      category: row.category,
      stock: row.stock,
      image: row.image_url,
      inStock: row.stock > 0,
    }));
  }

  /**
   * Search products by name or brand
   * @param {string} query - Search query
   * @returns {array} Array of products
   */
  static async search(searchQuery) {
    const query = `
      SELECT 
        p.id, p.name, p.brand, p.price, p.description, 
        p.gender, p.category_id, c.name as category, p.stock, 
        p.image_url, p.created_at
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.name LIKE ? OR p.brand LIKE ? OR p.description LIKE ?
      ORDER BY p.created_at DESC
    `;
    const searchTerm = `%${searchQuery}%`;
    const [rows] = await pool.execute(query, [searchTerm, searchTerm, searchTerm]);

    return rows.map(row => ({
      id: row.id,
      name: row.name,
      brand: row.brand,
      price: parseFloat(row.price),
      description: row.description,
      gender: row.gender,
      category: row.category,
      stock: row.stock,
      image: row.image_url,
      inStock: row.stock > 0,
    }));
  }

  /**
   * Create a new product (admin only)
   * @param {object} productData - Product information
   * @returns {object} Created product
   */
  static async create(productData) {
    const { name, brand, description, gender, category_id, price, stock, image_url } = productData;

    const query = `
      INSERT INTO products 
      (name, brand, description, gender, category_id, price, stock, image_url) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(query, [
      name,
      brand,
      description,
      gender,
      category_id,
      price,
      stock,
      image_url,
    ]);

    return {
      id: result.insertId,
      name,
      brand,
      price: parseFloat(price),
      description,
      gender,
      category_id,
      stock,
      image_url,
      inStock: stock > 0,
    };
  }

  /**
   * Update product (admin only)
   * @param {number} id - Product ID
   * @param {object} updates - Fields to update
   * @returns {object} Updated product
   */
  static async update(id, updates) {
    const allowedFields = ['name', 'brand', 'description', 'price', 'stock', 'image_url', 'category_id'];
    const updateFields = [];
    const updateValues = [];

    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key) && value !== undefined) {
        updateFields.push(`${key} = ?`);
        updateValues.push(value);
      }
    }

    if (updateFields.length === 0) {
      return this.getById(id);
    }

    updateValues.push(id);

    const query = `UPDATE products SET ${updateFields.join(', ')} WHERE id = ?`;
    await pool.execute(query, updateValues);

    return this.getById(id);
  }

  /**
   * Delete product (admin only)
   * @param {number} id - Product ID
   * @returns {boolean} Success status
   */
  static async delete(id) {
    const query = 'DELETE FROM products WHERE id = ?';
    const [result] = await pool.execute(query, [id]);

    return result.affectedRows > 0;
  }
}

module.exports = Product;
