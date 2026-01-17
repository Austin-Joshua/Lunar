/**
 * User Model
 * Database operations for users
 */

const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  /**
   * Create a new user
   * @param {object} userData - { name, email, password }
   * @returns {object} Created user data
   */
  static async create(userData) {
    const { name, email, password } = userData;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    const [result] = await pool.execute(query, [name, email, hashedPassword, 'user']);

    return {
      id: result.insertId,
      name,
      email,
      role: 'user',
      createdAt: new Date().toISOString(),
    };
  }

  /**
   * Find user by email
   * @param {string} email - User email
   * @returns {object} User data or null
   */
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await pool.execute(query, [email]);

    return rows.length > 0 ? rows[0] : null;
  }

  /**
   * Find user by ID
   * @param {number} id - User ID
   * @returns {object} User data or null
   */
  static async findById(id) {
    const query = 'SELECT id, name, email, role, created_at FROM users WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);

    if (rows.length === 0) return null;

    return {
      id: rows[0].id,
      name: rows[0].name,
      email: rows[0].email,
      role: rows[0].role,
      createdAt: rows[0].created_at,
    };
  }

  /**
   * Get all users (admin only)
   * @returns {array} Array of user data
   */
  static async getAll() {
    const query = 'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC';
    const [rows] = await pool.execute(query);

    return rows.map(row => ({
      id: row.id,
      name: row.name,
      email: row.email,
      role: row.role,
      createdAt: row.created_at,
    }));
  }

  /**
   * Verify password
   * @param {string} plainPassword - Plain text password
   * @param {string} hashedPassword - Hashed password from database
   * @returns {boolean} Password match result
   */
  static async verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
