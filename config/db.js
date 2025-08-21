const mysql = require('mysql2');
const dotenv = require('dotenv');
const fs = require('fs');

// Load different env based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local';
dotenv.config({ path: envFile });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: true
    // If TiDB provides a CA certificate, you can add:
    // ca: fs.readFileSync('./tidb_server_ca.pem')
  } : undefined
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Connected to MySQL Database');
    connection.release();
  }
});

module.exports = pool.promise();
