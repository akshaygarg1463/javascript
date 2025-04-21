const db = require('../db');
exports.createContact = function(req, res) {
    const { first_name, last_name, email, phone, profile_img, addresses } = req.body;
  
    // Step 1: Insert the contact
    const contactQuery = `INSERT INTO contacts (first_name, last_name, email, phone, profile_img) VALUES (?, ?, ?, ?, ?)`;
  
    db.query(contactQuery, [first_name, last_name, email, phone, profile_img], function(err, result) {
      if (err) return res.status(500).json({ error: 'Database error during contact insertion', details: err });
  
      const contactId = result.insertId;
  
      // Step 2: Insert the addresses (if provided)
      if (Array.isArray(addresses) && addresses.length > 0) {
        const addressQuery = `INSERT INTO addresses (contact_id, type, street, state, country) VALUES ?`;
  
        const addressValues = addresses.map(function(addr) {
          return [contactId, addr.type, addr.street, addr.state, addr.country];
        });
  
        db.query(addressQuery, [addressValues], function(err2) {
          if (err2) return res.status(500).json({ error: 'Database error during address insertion', details: err2 });
  
          res.status(201).json({ message: 'Contact and addresses created', contact_id: contactId });
        });
      } else {
        // No addresses to insert
        res.status(201).json({ message: 'Contact created (no addresses)', contact_id: contactId });
      }
    });
  };


// Get all contacts with their addresses
exports.getAllContacts = (req, res) => {
  // Query to fetch all contacts along with addresses
  const query = `SELECT contacts.id AS contact_id, contacts.first_name, contacts.last_name, contacts.email, 
                 contacts.phone, contacts.profile_img, addresses.id AS address_id, addresses.type, 
                 addresses.street, addresses.state, addresses.country 
                 FROM contacts 
                 LEFT JOIN addresses ON contacts.id = addresses.contact_id`;

  db.query(query, (err, results) => {
    if (err) {
      // If there's an error executing the query, return a 500 response with the error
      return res.status(500).json({ message: 'Database query failed', error: err });
    }

    // If no contacts are found, return an empty list
    if (results.length === 0) {
      return res.status(404).json({ message: 'No contacts found' });
    }

    // Successfully found contacts, return the results
    res.status(200).json(results);
  });
};



// Get a single contact by its ID, along with addresses
exports.getContactById = (req, res) => {
    const contactId = req.params.id; // Get the contact ID from the URL parameters
  
    // Query to fetch the contact and its associated address
    const query = `SELECT contacts.id AS contact_id, contacts.first_name, contacts.last_name, contacts.email, 
                   contacts.phone, contacts.profile_img, addresses.id AS address_id, addresses.type, 
                   addresses.street, addresses.state, addresses.country 
                   FROM contacts 
                   LEFT JOIN addresses ON contacts.id = addresses.contact_id
                   WHERE contacts.id = ?`; // Use parameterized query to prevent SQL injection
  
    db.query(query, [contactId], (err, results) => {
      if (err) {
        // If there's an error executing the query, return a 500 response with the error
        return res.status(500).json({ message: 'Database query failed', error: err });
      }
  
      console.log(results); // Log the results to the console for debugging purposes.
  
      // If no contact is found with the given ID, return a 404 response
      if (results.length === 0) {
        return res.status(404).json({ message: `Contact with ID ${contactId} not found` });
      }
  
      // Successfully found the contact, return the result
      res.status(200).json(results);
    });
  };
  


exports.updateContact = (req, res) => {
  const contactId = req.params.id;
  const {
    first_name,
    last_name,
    email,
    phone,
    profile_img,
    addresses // Array of address objects
  } = req.body;

  // Step 1: Update the contact table
  const updateContactQuery = `
    UPDATE contacts 
    SET first_name = ?, last_name = ?, email = ?, phone = ?, profile_img = ? 
    WHERE id = ?
  `;

  db.query(updateContactQuery, [first_name, last_name, email, phone, profile_img, contactId], function(err, result) {
    if (err) {
      return res.status(500).json({ message: 'Failed to update contact', error: err });
    }

    // Step 2: Delete existing addresses for this contact
    const deleteAddressQuery = `DELETE FROM addresses WHERE contact_id = ?`;
    db.query(deleteAddressQuery, [contactId], function(err) {
      if (err) {
        return res.status(500).json({ message: 'Failed to delete old addresses', error: err });
      }

      // Step 3: Insert new addresses
      if (addresses && addresses.length > 0) {
        const insertAddressQuery = `
          INSERT INTO addresses (contact_id, type, street, state, country)
          VALUES ?
        `;
        const addressValues = addresses.map(addr => [
          contactId,
          addr.type,
          addr.street,
          addr.state,
          addr.country
        ]);

        db.query(insertAddressQuery, [addressValues], function(err) {
          if (err) {
            return res.status(500).json({ message: 'Failed to insert new addresses', error: err });
          }

          return res.status(200).json({ message: 'Contact and addresses updated successfully' });
        });
      } else {
        return res.status(200).json({ message: 'Contact updated without address changes' });
      }
    });
  });
};



exports.deleteContact = (req, res) => {
  const contactId = req.params.id;

  // Step 1: Delete the contact (addresses will auto-delete if ON DELETE CASCADE is enabled)
  const deleteContactQuery = `DELETE FROM contacts WHERE id = ?`;

  db.query(deleteContactQuery, [contactId], function(err, result) {
    if (err) {
      return res.status(500).json({ message: 'Failed to delete contact', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact and associated addresses deleted successfully' });
  });
};

