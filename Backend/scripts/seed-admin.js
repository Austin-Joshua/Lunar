/**
 * Admin User Seed Script
 * 
 * Automatically creates admin user on first run
 * Prevents duplicate entries
 * Ensures password is properly hashed
 * 
 * Run: node scripts/seed-admin.js
 */

const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import pool after dotenv is loaded
const { pool } = require('../config/db');

const ADMIN_EMAIL = 'admin@lunar.com';
const ADMIN_PASSWORD = 'password';
const ADMIN_NAME = 'Admin User';

async function seedAdmin() {
  try {
    console.log('🌙 Seeding Lunar admin user...\n');

    // Check if admin already exists
    const checkQuery = 'SELECT id FROM users WHERE email = ? AND role = ?';
    const [existingAdmin] = await pool.execute(checkQuery, [ADMIN_EMAIL, 'admin']);

    if (existingAdmin.length > 0) {
      console.log('ℹ️  Admin user already exists');
      console.log(`   Email: ${ADMIN_EMAIL}`);
      console.log(`   Password: ${ADMIN_PASSWORD}`);
      process.exit(0);
    }

    // Hash password
    console.log('🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    // Insert admin user
    console.log('👤 Creating admin user...');
    const insertQuery = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    const [result] = await pool.execute(insertQuery, [
      ADMIN_NAME,
      ADMIN_EMAIL,
      hashedPassword,
      'admin'
    ]);

    console.log('✅ Admin user created successfully!\n');
    console.log('📋 Admin Credentials:');
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
    console.log(`   User ID: ${result.insertId}`);
    console.log('\n⚠️  IMPORTANT: Change password after first login!');

    process.exit(0);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.log('ℹ️  Admin user already exists (duplicate entry)\n');
    } else if (error.code === 'ER_NO_REFERENCED_ROW') {
      console.error('❌ Error: Users table not found. Run database setup first:\n');
      console.error('   mysql -u root -p < Backend/database/schema.sql\n');
      process.exit(1);
    } else {
      console.error('❌ Error seeding admin:', error.message);
      process.exit(1);
    }
  } finally {
    // Close connection pool
    await pool.end();
  }
}

// Run seed if this file is executed directly
if (require.main === module) {
  seedAdmin();
}

module.exports = { seedAdmin };
