const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 5000;

app.use(express.json());

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'akshay',
  database: 'contactapp'
});


app.get('/contacts', function(req, res) {
  const sql = `
    SELECT c.*, 
      MAX(CASE WHEN a.address_type = 'address1' THEN a.address END) AS address1,
      MAX(CASE WHEN a.address_type = 'address2' THEN a.address END) AS address2
    FROM contacts c
    LEFT JOIN addresses a ON c.id = a.contact_id
    GROUP BY c.id
  `;

  db.query(sql, function(err, results) {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

app.get('/contacts/:id', function(req, res) {
  const id = req.params.id;

  const sql = `
    SELECT c.*, 
      MAX(CASE WHEN a.address_type = 'address1' THEN a.address END) AS address1,
      MAX(CASE WHEN a.address_type = 'address2' THEN a.address END) AS address2
    FROM contacts c
    LEFT JOIN addresses a ON c.id = a.contact_id
    WHERE c.id = ?
    GROUP BY c.id
  `;

  db.query(sql, [id], function(err, results) {
    if (err) return res.status(500).send(err);
    if (results.length === 0) {
      return res.status(404).send({ message: 'Contact not found' });
    }
    res.send(results[0]);
  });
});


app.post('/contacts', function(req, res) {
  const { name, email, phone, image_url, address1, address2 } = req.body;

  const sql = 'INSERT INTO contacts (name, email, phone, image_url) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, phone, image_url], function(err, result) {
    if (err) return res.status(500).send(err);

    const contactId = result.insertId;
    const addressSql = 'INSERT INTO addresses (contact_id, address, address_type) VALUES ?';
    const addressValues = [
      [contactId, address1, 'address1'],
      [contactId, address2, 'address2']
    ];

    db.query(addressSql, [addressValues], function(err2) {
      if (err2) return res.status(500).send(err2);
      res.status(201).send({ id: contactId, name, email, phone, image_url, address1, address2 });
    });
  });
});


app.put('/contacts/:id', function(req, res) {
  const id = req.params.id;
  const { name, email, phone, image_url, address1, address2 } = req.body;

  const updateSql = 'UPDATE contacts SET name=?, email=?, phone=?, image_url=? WHERE id=?';
  db.query(updateSql, [name, email, phone, image_url, id], function(err) {
    if (err) return res.status(500).send(err);

    const updateAddressSql = `
      INSERT INTO addresses (contact_id, address, address_type)
      VALUES (?, ?, 'address1'), (?, ?, 'address2')
      ON DUPLICATE KEY UPDATE address = VALUES(address)
    `;
    db.query(updateAddressSql, [id, address1, id, address2], function(err2) {
      if (err2) return res.status(500).send(err2);
      res.send({ id, name, email, phone, image_url, address1, address2 });
    });
  });
});


app.delete('/contacts/:id', function(req, res) {
  const id = req.params.id;

  const deleteAddressesSql = 'DELETE FROM addresses WHERE contact_id = ?';
  db.query(deleteAddressesSql, [id], function(err) {
    if (err) return res.status(500).send(err);

    const deleteContactSql = 'DELETE FROM contacts WHERE id = ?';
    db.query(deleteContactSql, [id], function(err2) {
      if (err2) return res.status(500).send(err2);
      res.send({ message: 'Contact deleted successfully' });
    });
  });
});

app.listen(port, function() {
  console.log(`Server running on http://localhost:5000`);
});
