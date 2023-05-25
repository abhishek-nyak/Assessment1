const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'laundry_m',
  password: '12345678'
});

db.on('error', (err) => {
  console.error('Error connecting to the database:', err);
});

module.exports = db;