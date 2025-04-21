const db = require('../db');


const createAddressesTable = function() {
  const query = `
    CREATE TABLE IF NOT EXISTS addresses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      contact_id INT,
      type ENUM('address1', 'address2'),
      street VARCHAR(255),
      state VARCHAR(100),
      country VARCHAR(100),
      FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE
    )
  `;

  db.query(query, function(err, result) {
    if (err) {
      console.error('Error creating addresses table:', err);
    } else {
      console.log('Addresses table is ready.');
    }
  });
};

module.exports = { createAddressesTable };
