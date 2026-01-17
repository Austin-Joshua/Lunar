/**
 * Database Configuration
 * MySQL connection pooling using mysql2/promise
 * 
 * Environment variables required:
 * - DB_HOST: Database host
 * - DB_PORT: Database port
 * - DB_USER: Database user
 * - DB_PASSWORD: Database password
 * - DB_NAME: Database name
 */

const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Set default values if environment variables are not loaded
if (!process.env.DB_HOST) process.env.DB_HOST = 'localhost';
if (!process.env.DB_USER) process.env.DB_USER = 'root';
if (!process.env.DB_PASSWORD) process.env.DB_PASSWORD = '123456';
if (!process.env.DB_NAME) process.env.DB_NAME = 'lunar_db';

// Validate required environment variables
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_NAME'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.warn(`⚠️  Some environment variables not set, using defaults`);
}

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0,
});

/**
 * Test database connection
 */
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✓ Database connected successfully');
    connection.release();
  } catch (error) {
    console.error('✗ Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = {
  pool,
  testConnection,
};
