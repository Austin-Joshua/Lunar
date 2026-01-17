/**
 * Refresh Token Model
 * Manages JWT refresh tokens for extended sessions
 */

const pool = require('../config/db');

class RefreshToken {
  /**
   * Store refresh token in database
   * @param {number} userId - User ID
   * @param {string} token - Refresh token
   * @param {number} expiresIn - Expiration time in seconds (default: 7 days)
   */
  static async create(userId, token, expiresIn = 7 * 24 * 60 * 60) {
    try {
      const expiresAt = new Date(Date.now() + expiresIn * 1000);

      const query = `
        INSERT INTO refresh_tokens (user_id, token, expires_at, created_at)
        VALUES (?, ?, ?, NOW())
      `;

      await pool.execute(query, [userId, token, expiresAt]);
      return true;
    } catch (error) {
      console.error('Error creating refresh token:', error);
      throw error;
    }
  }

  /**
   * Verify and retrieve refresh token
   * @param {string} token - Refresh token
   * @returns {object} Token data with user info
   */
  static async verify(token) {
    try {
      const query = `
        SELECT rt.*, u.id, u.email, u.role
        FROM refresh_tokens rt
        JOIN users u ON rt.user_id = u.id
        WHERE rt.token = ? AND rt.expires_at > NOW() AND rt.is_revoked = false
      `;

      const [rows] = await pool.execute(query, [token]);

      if (rows.length === 0) {
        return null;
      }

      return rows[0];
    } catch (error) {
      console.error('Error verifying refresh token:', error);
      throw error;
    }
  }

  /**
   * Revoke refresh token
   * @param {string} token - Refresh token to revoke
   */
  static async revoke(token) {
    try {
      const query = `
        UPDATE refresh_tokens
        SET is_revoked = true, revoked_at = NOW()
        WHERE token = ?
      `;

      await pool.execute(query, [token]);
      return true;
    } catch (error) {
      console.error('Error revoking refresh token:', error);
      throw error;
    }
  }

  /**
   * Revoke all tokens for a user (logout from all devices)
   * @param {number} userId - User ID
   */
  static async revokeAllForUser(userId) {
    try {
      const query = `
        UPDATE refresh_tokens
        SET is_revoked = true, revoked_at = NOW()
        WHERE user_id = ?
      `;

      await pool.execute(query, [userId]);
      return true;
    } catch (error) {
      console.error('Error revoking all tokens:', error);
      throw error;
    }
  }

  /**
   * Clean up expired tokens (run periodically)
   */
  static async cleanup() {
    try {
      const query = `
        DELETE FROM refresh_tokens
        WHERE expires_at < NOW() OR (is_revoked = true AND revoked_at < DATE_SUB(NOW(), INTERVAL 7 DAY))
      `;

      await pool.execute(query);
      return true;
    } catch (error) {
      console.error('Error cleaning up tokens:', error);
      throw error;
    }
  }
}

module.exports = RefreshToken;
