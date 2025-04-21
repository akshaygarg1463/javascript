const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'akshay',  // Replace with your MySQL password
  database: 'contactdb' // Replace with your database name
});

db.connect(function(err) {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = db;
