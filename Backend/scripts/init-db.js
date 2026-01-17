/**
 * Database Initialization Script
 * Creates the lunar_db database and all required tables
 */

const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

function initializeDatabase() {
  try {
    // Create connection to MySQL
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456',
    });

    connection.connect((error) => {
      if (error) {
        console.error('❌ Connection failed:', error.message);
        process.exit(1);
      }
      console.log('✅ Connected to MySQL');

      // Create database
      connection.query('CREATE DATABASE IF NOT EXISTS lunar_db', (error) => {
        if (error) throw error;
        console.log('✅ Database created/verified');

        // Read schema file
        const schemaPath = path.join(__dirname, '../database/schema.sql');
        let schema = fs.readFileSync(schemaPath, 'utf8');

        // Remove comments and split into statements
        schema = schema
          .split('\n')
          .filter(line => !line.trim().startsWith('--') && !line.trim().startsWith('/**') && !line.trim().startsWith('*') && !line.trim().startsWith('/*'))
          .join('\n');

        const statements = schema
          .split(';')
          .map(s => s.trim())
          .filter(s => s && s.length > 0);

        let completed = 0;

        // Execute each statement
        statements.forEach((statement) => {
          connection.query(statement, (error) => {
            if (error && !error.message.includes('already exists')) {
              console.warn('⚠️  Query warning:', error.message.substring(0, 100));
            }
            completed++;
            if (completed === statements.length) {
              console.log('✅ All tables created successfully');
              connection.query('SHOW TABLES FROM lunar_db', (error, results) => {
                if (error) throw error;
                console.log(`✅ Database has ${results.length} tables`);
                connection.end();
                console.log('✅ Database initialization complete!');
                process.exit(0);
              });
            }
          });
        });
      });
    });
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    process.exit(1);
  }
}

initializeDatabase();
