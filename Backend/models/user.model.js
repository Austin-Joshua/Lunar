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
   * Find user by email (case-insensitive)
   * @param {string} email - User email
   * @returns {object} User data or null
   */
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE LOWER(email) = LOWER(?)';
    const [rows] = await pool.execute(query, [email]);

    return rows.length > 0 ? rows[0] : null;
  }

  /**
   * Find user by ID
   * @param {number} id - User ID
   * @returns {object} User data or null
   */
  static async findById(id) {
    const query = `
      SELECT id, name, email, role, created_at, oauth_provider, profile_image 
      FROM users WHERE id = ?
    `;
    const [rows] = await pool.execute(query, [id]);

    if (rows.length === 0) return null;

    return {
      id: rows[0].id,
      name: rows[0].name,
      email: rows[0].email,
      role: rows[0].role,
      oauthProvider: rows[0].oauth_provider,
      profileImage: rows[0].profile_image,
      createdAt: rows[0].created_at,
    };
  }

  /**
   * Update OAuth data for user
   * @param {number} userId - User ID
   * @param {string} provider - OAuth provider (google, apple)
   * @param {string} oauthId - OAuth ID from provider
   * @param {string} profileImage - Profile image URL
   */
  static async updateOAuthData(userId, provider, oauthId, profileImage = null) {
    const query = `
      UPDATE users 
      SET oauth_provider = ?, oauth_id = ?, profile_image = ? 
      WHERE id = ?
    `;
    await pool.execute(query, [provider, oauthId, profileImage, userId]);
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
