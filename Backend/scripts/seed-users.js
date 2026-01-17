/**
 * Seed Admin and Demo Users
 * Run this script to populate the database with test accounts
 */

require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

const seedUsers = async () => {
  try {
    console.log('🌱 Starting user seeding...');

    // Admin User
    const adminEmail = 'admin@lunar.com';
    const adminPassword = await bcrypt.hash('admin123', 10);

    // Demo User
    const demoEmail = 'demo@lunar.com';
    const demoPassword = await bcrypt.hash('demo123', 10);

    // Customer User
    const customerEmail = 'customer@lunar.com';
    const customerPassword = await bcrypt.hash('customer123', 10);

    // Check and create admin
    const [existingAdmin] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [adminEmail]
    );

    if (existingAdmin.length === 0) {
      await pool.execute(
        'INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())',
        ['Admin User', adminEmail, adminPassword, 'admin']
      );
      console.log('✅ Admin user created');
      console.log('   Email: admin@lunar.com');
      console.log('   Password: admin123');
    } else {
      console.log('⏭️  Admin user already exists');
    }

    // Check and create demo user
    const [existingDemo] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [demoEmail]
    );

    if (existingDemo.length === 0) {
      await pool.execute(
        'INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())',
        ['Demo User', demoEmail, demoPassword, 'user']
      );
      console.log('✅ Demo user created');
      console.log('   Email: demo@lunar.com');
      console.log('   Password: demo123');
    } else {
      console.log('⏭️  Demo user already exists');
    }

    // Check and create customer user
    const [existingCustomer] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [customerEmail]
    );

    if (existingCustomer.length === 0) {
      await pool.execute(
        'INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())',
        ['Customer User', customerEmail, customerPassword, 'user']
      );
      console.log('✅ Customer user created');
      console.log('   Email: customer@lunar.com');
      console.log('   Password: customer123');
    } else {
      console.log('⏭️  Customer user already exists');
    }

    console.log('\n✅ User seeding completed successfully!');
    console.log('\n📋 Available Test Accounts:\n');
    console.log('1️⃣  ADMIN ACCOUNT');
    console.log('   Email: admin@lunar.com');
    console.log('   Password: admin123');
    console.log('   Access: Full admin dashboard\n');

    console.log('2️⃣  DEMO ACCOUNT');
    console.log('   Email: demo@lunar.com');
    console.log('   Password: demo123');
    console.log('   Access: Regular customer features\n');

    console.log('3️⃣  CUSTOMER ACCOUNT');
    console.log('   Email: customer@lunar.com');
    console.log('   Password: customer123');
    console.log('   Access: Regular customer features\n');

  } catch (error) {
    console.error('❌ Error seeding users:', error.message);
  } finally {
    process.exit();
  }
};

seedUsers();
