const mysql = require('mysql2');
/*
*********************************************************
*  @Method Name    : MySQL Connection Configuration
*  @Author         : Akshay Garg (akshay.garg@antrazal.com)
*  @Company        : Antrazal
*  @Description    : Configures the connection parameters to the MySQL database
*                    including host, user, password, and database name.
*  @return         : MySQL connection object
*********************************************************
*/
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'akshay', 
  database: 'contactdb' 
});
/*
*********************************************************
*  @Method Name    : MySQL Connection Establishment
*  @Author         : Akshay Garg (akshay.garg@antrazal.com)
*  @Company        : Antrazal
*  @Description    : Attempts to connect to the MySQL database. If the connection 
*                    is successful, logs a success message, otherwise logs 
*                    an error message with the error details.
*  @return         : void
*********************************************************
*/
db.connect(function(err) {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to MySQL database');
  }
});
/*
*********************************************************
*  @Method Name    : Database Export
*  @Author         : Akshay Garg (akshay.garg@antrazal.com)
*  @Company        : Antrazal
*  @Description    : Exports the MySQL connection instance so it can be 
*                    used by other parts of the application for executing queries.
*  @return         : MySQL connection object
*********************************************************
*/
module.exports = db;
