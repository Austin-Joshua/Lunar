/**
 * Main Server File
 * Entry point for the Lunar backend API
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { testConnection } = require('./config/db');

// Routes
const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const ordersRoutes = require('./routes/orders.routes');
const categoriesRoutes = require('./routes/categories.routes');
const usersRoutes = require('./routes/users.routes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// CORS Configuration - Allow frontend to access backend
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 3600, // 1 hour
}));

// Body parsing middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Log all requests in development
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Lunar API is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/users', usersRoutes);

// Admin stats endpoint
app.get('/api/admin/stats', require('./middleware/auth.middleware'), require('./middleware/admin.middleware'), async (req, res) => {
  try {
    const { pool } = require('./config/db');
    
    // Get stats
    const [usersCount] = await pool.execute('SELECT COUNT(*) as count FROM users');
    const [productsCount] = await pool.execute('SELECT COUNT(*) as count FROM products');
    const [ordersCount] = await pool.execute('SELECT COUNT(*) as count FROM orders');
    const [totalRevenue] = await pool.execute('SELECT SUM(total_price) as total FROM orders WHERE status != "cancelled"');

    res.status(200).json({
      success: true,
      data: {
        totalUsers: usersCount[0].count,
        totalProducts: productsCount[0].count,
        totalOrders: ordersCount[0].count,
        totalRevenue: totalRevenue[0].total || 0,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving stats',
    });
  }
});

// Import error handlers
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler.middleware');

// 404 Not Found handler
app.use(notFoundHandler);

// Global error handler (must be LAST)
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();

    app.listen(PORT, () => {
      console.log(`
╭─────────────────────────────────────────╮
│   LUNAR API Server Started Successfully │
├─────────────────────────────────────────┤
│  Port: ${PORT}
│  Environment: ${process.env.NODE_ENV || 'development'}
│  CORS Origin: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}
╰─────────────────────────────────────────╯
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
