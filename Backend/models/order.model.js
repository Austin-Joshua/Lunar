/**
 * Order Model
 * Database operations for orders and order items
 */

const { pool } = require('../config/db');

class Order {
  /**
   * Get all orders (admin only)
   * @returns {array} Array of orders with items
   */
  static async getAll() {
    const query = `
      SELECT 
        o.id, o.user_id, u.name, u.email, o.total_price, 
        o.status, o.created_at
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `;
    const [orders] = await pool.execute(query);

    // Fetch items for each order
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => ({
        ...order,
        items: await this.getOrderItems(order.id),
      }))
    );

    return ordersWithItems.map(order => ({
      id: order.id,
      userId: order.user_id,
      userName: order.name,
      userEmail: order.email,
      total: parseFloat(order.total_price),
      status: order.status,
      items: order.items,
      createdAt: order.created_at,
    }));
  }

  /**
   * Get order by ID
   * @param {number} id - Order ID
   * @returns {object} Order data with items
   */
  static async getById(id) {
    const query = `
      SELECT 
        o.id, o.user_id, u.name, u.email, o.total_price, 
        o.status, o.created_at
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      WHERE o.id = ?
    `;
    const [rows] = await pool.execute(query, [id]);

    if (rows.length === 0) return null;

    const order = rows[0];
    const items = await this.getOrderItems(id);

    return {
      id: order.id,
      userId: order.user_id,
      userName: order.name,
      userEmail: order.email,
      total: parseFloat(order.total_price),
      status: order.status,
      items,
      createdAt: order.created_at,
    };
  }

  /**
   * Get user's orders
   * @param {number} userId - User ID
   * @returns {array} Array of user's orders
   */
  static async getByUserId(userId) {
    const query = `
      SELECT 
        o.id, o.user_id, o.total_price, o.status, o.created_at
      FROM orders o
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
    `;
    const [orders] = await pool.execute(query, [userId]);

    // Fetch items for each order
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => ({
        ...order,
        items: await this.getOrderItems(order.id),
      }))
    );

    return ordersWithItems.map(order => ({
      id: order.id,
      userId: order.user_id,
      total: parseFloat(order.total_price),
      status: order.status,
      items: order.items,
      createdAt: order.created_at,
    }));
  }

  /**
   * Get items for an order
   * @param {number} orderId - Order ID
   * @returns {array} Array of order items
   */
  static async getOrderItems(orderId) {
    const query = `
      SELECT 
        oi.id, oi.product_id, p.name, p.image_url, oi.quantity, 
        oi.price, p.brand
      FROM order_items oi
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `;
    const [rows] = await pool.execute(query, [orderId]);

    return rows.map(row => ({
      id: row.id,
      productId: row.product_id,
      name: row.name,
      brand: row.brand,
      image: row.image_url,
      quantity: row.quantity,
      price: parseFloat(row.price),
    }));
  }

  /**
   * Create a new order with items
   * @param {number} userId - User ID
   * @param {array} items - Array of { productId, quantity, price }
   * @param {number} totalPrice - Total order price
   * @returns {object} Created order with items
   */
  static async create(userId, items, totalPrice) {
    try {
      // Create order
      const orderQuery = 'INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, ?)';
      const [orderResult] = await pool.execute(orderQuery, [userId, totalPrice, 'pending']);
      const orderId = orderResult.insertId;

      // Create order items
      const itemQuery = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';
      
      for (const item of items) {
        await pool.execute(itemQuery, [orderId, item.productId, item.quantity, item.price]);
      }

      return await this.getById(orderId);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update order status (admin only)
   * @param {number} id - Order ID
   * @param {string} status - New status
   * @returns {object} Updated order
   */
  static async updateStatus(id, status) {
    const validStatuses = ['pending', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }

    const query = 'UPDATE orders SET status = ? WHERE id = ?';
    await pool.execute(query, [status, id]);

    return this.getById(id);
  }

  /**
   * Check if user owns the order
   * @param {number} orderId - Order ID
   * @param {number} userId - User ID
   * @returns {boolean} Ownership status
   */
  static async isOwner(orderId, userId) {
    const query = 'SELECT user_id FROM orders WHERE id = ?';
    const [rows] = await pool.execute(query, [orderId]);

    return rows.length > 0 && rows[0].user_id === userId;
  }
}

module.exports = Order;
