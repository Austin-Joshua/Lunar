/**
 * Category Model
 * Database operations for product categories
 */

const { pool } = require('../config/db');

class Category {
  /**
   * Get all categories
   * @returns {array} Array of categories
   */
  static async getAll() {
    const query = 'SELECT id, name, gender FROM categories ORDER BY gender, name';
    const [rows] = await pool.execute(query);

    return rows.map(row => ({
      id: row.id,
      name: row.name,
      gender: row.gender,
    }));
  }

  /**
   * Get categories by gender
   * @param {string} gender - 'men', 'women', or 'kids'
   * @returns {array} Array of categories
   */
  static async getByGender(gender) {
    const query = 'SELECT DISTINCT name FROM categories WHERE gender = ? ORDER BY name';
    const [rows] = await pool.execute(query, [gender]);

    return rows.map(row => row.name);
  }

  /**
   * Create a new category
   * @param {object} categoryData - { name, gender }
   * @returns {object} Created category
   */
  static async create(categoryData) {
    const { name, gender } = categoryData;

    const query = 'INSERT INTO categories (name, gender) VALUES (?, ?)';
    const [result] = await pool.execute(query, [name, gender]);

    return {
      id: result.insertId,
      name,
      gender,
    };
  }

  /**
   * Find category by name and gender
   * @param {string} name - Category name
   * @param {string} gender - Gender type
   * @returns {object} Category data or null
   */
  static async findByNameAndGender(name, gender) {
    const query = 'SELECT id FROM categories WHERE name = ? AND gender = ?';
    const [rows] = await pool.execute(query, [name, gender]);

    return rows.length > 0 ? rows[0] : null;
  }
}

module.exports = Category;
