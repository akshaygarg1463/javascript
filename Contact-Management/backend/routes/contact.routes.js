const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');

/*
*********************************************************
*  @Method Name    : Get All Contacts
*  @Author         : Akshay Garg (akshay.garg@antrazal.com)
*  @Company        : Antrazal
*  @Description    : Handles GET requests to fetch all contacts with their 
*                    associated addresses. Calls the `getAllContacts` 
*                    method from the contact controller.
*  @return         : HTTP response with the list of contacts
*********************************************************
*/
router.get('/contacts', contactController.getAllContacts);


/*
*********************************************************
*  @Method Name    : Get Contact By ID
*  @Author         : Akshay Garg (akshay.garg@antrazal.com)
*  @Company        : Antrazal
*  @Description    : Handles GET requests to fetch a single contact and its 
*                    addresses based on the provided contact ID. Calls the 
*                    `getContactById` method from the contact controller.
*  @param          : id - The ID of the contact to fetch
*  @return         : HTTP response with the details of the contact
*********************************************************
*/
router.get('/contact/:id', contactController.getContactById);

/*
*********************************************************
*  @Method Name    : Create Contact
*  @Author         : Akshay Garg (akshay.garg@antrazal.com)
*  @Company        : Antrazal
*  @Description    : Handles POST requests to create a new contact. The 
*                    provided data is sent to the `createContact` method in the 
*                    contact controller for insertion into the database.
*  @return         : HTTP response with the newly created contact data
*********************************************************
*/
router.post('/contact', contactController.createContact);

/*
*********************************************************
*  @Method Name    : Update Contact
*  @Author         : Akshay Garg (akshay.garg@antrazal.com)
*  @Company        : Antrazal
*  @Description    : Handles PUT requests to update an existing contact based 
*                    on the provided contact ID. Calls the `updateContact` 
*                    method from the contact controller to modify the contact's 
*                    data in the database.
*  @param          : id - The ID of the contact to update
*  @return         : HTTP response with the updated contact data
*********************************************************
*/
router.put('/contact/:id', contactController.updateContact);
/*
*********************************************************
*  @Method Name    : Delete Contact
*  @Author         : Akshay Garg (akshay.garg@antrazal.com)
*  @Company        : Antrazal
*  @Description    : Handles DELETE requests to remove a contact from the 
*                    database based on the provided contact ID. Calls the 
*                    `deleteContact` method from the contact controller to 
*                    perform the deletion.
*  @param          : id - The ID of the contact to delete
*  @return         : HTTP response confirming the deletion of the contact
*********************************************************
*/
router.delete('/contact/:id', contactController.deleteContact);


/*
*********************************************************
*  @Method Name    : Export Contact Routes
*  @Author         : Akshay Garg (akshay.garg@antrazal.com)
*  @Company        : Antrazal
*  @Description    : Exports the router object that contains all the contact-related 
*                    routes to be used in the main Express app for handling 
*                    contact operations.
*  @return         : Express router object
*********************************************************
*/


router.put('/addresses/:contactId/:type', contactController.updateAddress);


module.exports = router;
