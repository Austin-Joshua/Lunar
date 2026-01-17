/**
 * Clear Users Script
 * Removes all user-created credentials from the database
 * Keeps admin account if it exists
 */

const mysql = require('mysql2');

function clearUsers() {
  try {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'lunar_db',
    });

    connection.connect((error) => {
      if (error) {
        console.error('❌ Connection failed:', error.message);
        process.exit(1);
      }
      console.log('✅ Connected to lunar_db');

      // Delete all users except admin (id = 1)
      const query = 'DELETE FROM users WHERE id > 1';

      connection.query(query, (error, results) => {
        if (error) {
          console.error('❌ Error clearing users:', error.message);
          connection.end();
          process.exit(1);
        }

        console.log(`✅ Removed ${results.affectedRows} user(s) from the database`);

        // Also clear refresh tokens
        const tokenQuery = 'TRUNCATE TABLE refresh_tokens';
        connection.query(tokenQuery, (error) => {
          if (error) {
            console.error('❌ Error clearing tokens:', error.message);
          } else {
            console.log('✅ Cleared all refresh tokens');
          }

          connection.end();
          console.log('✅ Database cleaned successfully!');
          process.exit(0);
        });
      });
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

clearUsers();
