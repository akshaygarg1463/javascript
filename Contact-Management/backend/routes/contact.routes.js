const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');

// Get all contacts with addresses
router.get('/contacts', contactController.getAllContacts);


// Get a single contact with addresses
router.get('/contact/:id', contactController.getContactById);

// create a contact
router.post('/contact', contactController.createContact);

//update a contact
router.put('/contact/:id', contactController.updateContact);
// Delete a contact
router.delete('/contact/:id', contactController.deleteContact);

module.exports = router;
