const db = require('../db');

const createContactsTable = function() {
  const query = `
    CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      email VARCHAR(100),
      phone VARCHAR(20),
      profile_img VARCHAR(255)
    )
  `;

  db.query(query, function(err, result) {
    if (err) {
      console.error('Error creating contacts table:', err);
    } else {
      console.log('Contacts table is ready.');
    }
  });
};

module.exports = { createContactsTable };
