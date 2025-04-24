const db = require('../db');


/*
*********************************************************
*  @Method Name    : createContact
*  @Author         : Akshay Garg (akshay.garg@antrazal.com)
*  @Company        : Antrazal
*  @Description    : Creates a new contact along with optional multiple addresses.
*                    First inserts the contact into the 'contacts' table, then 
*                    inserts all associated addresses into the 'addresses' table.
*  @return         : JSON response with success or error message and contact ID.
*********************************************************
*/
exports.createContact = function(req, res) {
    const { first_name, last_name, email, phone,  profile_image, addresses } = req.body;
    console.log("random value",req.body)
    const contactQuery = `INSERT INTO contacts (first_name, last_name, email, phone, profile_img) VALUES (?, ?, ?, ?, ?)`;
  
    db.query(contactQuery, [first_name, last_name, email, phone,  profile_image], function(err, result) {
      if (err) return res.status(500).json({ error: 'Database error during contact insertion', details: err });
  
      const contactId = result.insertId;
  
      
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
        
        res.status(201).json({ message: 'Contact created (no addresses)', contact_id: contactId });
      }
    });
  };

/*
*********************************************************
*  @Method Name    : getAllContacts
*  @Author         : Akshay Garg (akshay.garg@antrazal.com)
*  @Company        : Antrazal
*  @Description    : Fetches all contacts and their associated addresses using 
*                    LEFT JOIN to combine 'contacts' and 'addresses' tables.
*  @return         : JSON response with the list of contacts and addresses or error.
*********************************************************
*/
exports.getAllContacts = function(req, res) {
  const query = `
    SELECT 
      contacts.id AS contact_id, contacts.first_name, contacts.last_name, contacts.email, 
      contacts.phone, contacts.profile_img, 
      addresses.id AS address_id, addresses.type, 
      addresses.street, addresses.state, addresses.country 
    FROM contacts 
    LEFT JOIN addresses ON contacts.id = addresses.contact_id
  `;

  db.query(query, function(err, results) {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (!results.length) return res.status(404).json({ message: 'No contacts found' });

    const contactsMap = {};

    results.forEach(function(row) {
      const contact = contactsMap[row.contact_id] ||= {
        id: row.contact_id,
        first_name: row.first_name,
        last_name: row.last_name,
        email: row.email,
        phone: row.phone,
        profile_image: row.profile_img, 
        addresses: []
      };

      if (row.address_id) {
        contact.addresses.push({
          id: row.address_id,
          type: row.type,
          street: row.street,
          state: row.state,
          country: row.country
        });
      }
    });

    res.status(200).json(Object.values(contactsMap));
  });
};




/*
*********************************************************
*  @Method Name    : getContactById
*  @Author         : Akshay Garg (akshay.garg@antrazal.com)
*  @Company        : Antrazal
*  @Description    : Retrieves a specific contact and its addresses based on the given ID.
*  @param          : id - Contact ID (from URL params)
*  @return         : JSON response with the contact data or error.
*********************************************************
*/
exports.getContactById = function(req, res) {
  const contactId = req.params.id;

  const query = `
    SELECT contacts.id AS contact_id, contacts.first_name, contacts.last_name, contacts.email, 
           contacts.phone, contacts.profile_img, addresses.id AS address_id, addresses.type, 
           addresses.street, addresses.state, addresses.country 
    FROM contacts 
    LEFT JOIN addresses ON contacts.id = addresses.contact_id
    WHERE contacts.id = ?
  `;

  db.query(query, [contactId], function(err, results) {
    if (err) return res.status(500).json({ message: 'Database query failed', error: err });
    if (!results.length) return res.status(404).json({ message: `Contact with ID ${contactId} not found` });

    const row = results[0];

    const contact = {
      id: row.contact_id,
      first_name: row.first_name,
      last_name: row.last_name,
      email: row.email,
      phone: row.phone,
      profile_image: row.profile_img, 
      addresses: []
    };

    results.forEach(function(r) {
      if (r.address_id) {
        contact.addresses.push({
          id: r.address_id,
          type: r.type,
          street: r.street,
          state: r.state,
          country: r.country
        });
      }
    });

    res.status(200).json(contact);
  });
};

  

/*
*********************************************************
*  @Method Name    : updateContact
*  @Author         : Akshay Garg (akshay.garg@antrazal.com)
*  @Company        : Antrazal
*  @Description    : Updates an existing contact and replaces all of its addresses.
*                    Steps: update contact data → delete old addresses → insert new addresses.
*  @param          : id - Contact ID (from URL params)
*  @return         : JSON response indicating success or failure.
*********************************************************
*/

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



/*
*********************************************************
*  @Method Name    : deleteContact
*  @Author         : Akshay Garg (akshay.garg@antrazal.com)
*  @Company        : Antrazal
*  @Description    : Deletes a contact by its ID. Addresses are also deleted 
*                    if foreign key constraint is set with ON DELETE CASCADE.
*  @param          : id - Contact ID (from URL params)
*  @return         : JSON response confirming deletion or error.
*********************************************************
*/
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
/*
*********************************************************
*  @Method Name    : updateAddress
*  @Author         : Akshay Garg (akshay.garg@antrazal.com)
*  @Company        : Antrazal
*  @Description    : Updates the address details of a specific type for a given contact ID.
*  @param          : contactId - ID of the contact (from URL params)
*                    type - Type of the address to update (from URL params)
*                    req.body - Contains updated street, state, and country values
*  @return         : JSON response with a success message or error.
*********************************************************
*/
exports.updateAddress = function(req, res) {
  const contactId = req.params.contactId;
  const type = req.params.type;
  const { street, state, country } = req.body;

  const updateQuery = `
    UPDATE addresses
    SET street = ?, state = ?, country = ?
    WHERE contact_id = ? AND type = ?
  `;

  db.query(updateQuery, [street, state, country, contactId, type], function(err, result) {
    if (err) {
      return res.status(500).json({ message: 'Failed to update address', error: err });
    }

    return res.status(200).json({ message: 'Address updated successfully' });
  });
};




  