/**
 * Orders Controller
 * Handles order operations (create, get, update status)
 */

const Order = require('../models/order.model');
const Product = require('../models/product.model');
const { success, error } = require('../utils/response');

/**
 * Get all orders (admin only)
 * GET /api/orders
 */
const getAll = async (req, res) => {
  try {
    const orders = await Order.getAll();

    return res.status(200).json(
      success(200, 'Orders retrieved successfully.', orders)
    );
  } catch (err) {
    console.error('Get all orders error:', err);
    return res.status(500).json(
      error(500, 'An error occurred while retrieving orders.')
    );
  }
};

/**
 * Get user's orders
 * GET /api/orders/my-orders
 */
const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.getByUserId(userId);

    return res.status(200).json(
      success(200, 'Orders retrieved successfully.', orders)
    );
  } catch (err) {
    console.error('Get my orders error:', err);
    return res.status(500).json(
      error(500, 'An error occurred while retrieving orders.')
    );
  }
};

/**
 * Get order by ID
 * GET /api/orders/:id
 */
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const order = await Order.getById(id);
    if (!order) {
      return res.status(404).json(
        error(404, 'Order not found.')
      );
    }

    // Check if user is owner or admin
    if (userRole !== 'admin' && order.userId !== userId) {
      return res.status(403).json(
        error(403, 'Forbidden. You do not have access to this order.')
      );
    }

    return res.status(200).json(
      success(200, 'Order retrieved successfully.', order)
    );
  } catch (err) {
    console.error('Get order by ID error:', err);
    return res.status(500).json(
      error(500, 'An error occurred while retrieving the order.')
    );
  }
};

/**
 * Create order
 * POST /api/orders
 */
const create = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;

    // Validate input
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json(
        error(400, 'Order items are required.')
      );
    }

    // Validate each item and check stock
    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      if (!item.productId || !item.quantity || !item.price) {
        return res.status(400).json(
          error(400, 'Each item must have productId, quantity, and price.')
        );
      }

      // Check if product exists and has stock
      const product = await Product.getById(item.productId);
      if (!product) {
        return res.status(404).json(
          error(404, `Product with ID ${item.productId} not found.`)
        );
      }

      if (product.stock < item.quantity) {
        return res.status(400).json(
          error(400, `Insufficient stock for product ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`)
        );
      }

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: parseFloat(item.price),
      });

      totalPrice += item.quantity * item.price;
    }

    // Create order
    const order = await Order.create(userId, orderItems, totalPrice);

    return res.status(201).json(
      success(201, 'Order created successfully.', order)
    );
  } catch (err) {
    console.error('Create order error:', err);
    return res.status(500).json(
      error(500, 'An error occurred while creating the order.')
    );
  }
};

/**
 * Update order status (admin only)
 * PUT /api/orders/:id/status
 */
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate input
    if (!status) {
      return res.status(400).json(
        error(400, 'Status is required.')
      );
    }

    // Check if order exists
    const order = await Order.getById(id);
    if (!order) {
      return res.status(404).json(
        error(404, 'Order not found.')
      );
    }

    // Update status
    const updatedOrder = await Order.updateStatus(id, status);

    return res.status(200).json(
      success(200, 'Order status updated successfully.', updatedOrder)
    );
  } catch (err) {
    if (err.message === 'Invalid status') {
      return res.status(400).json(
        error(400, 'Invalid status. Must be pending, shipped, delivered, or cancelled.')
      );
    }

    console.error('Update order status error:', err);
    return res.status(500).json(
      error(500, 'An error occurred while updating the order status.')
    );
  }
};

module.exports = {
  getAll,
  getMyOrders,
  getById,
  create,
  updateStatus,
};
