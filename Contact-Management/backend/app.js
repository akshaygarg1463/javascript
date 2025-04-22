/*
*********************************************************
*  @Method Name    : app.js Setup
*  @Author         : Akshay Garg (akshay.garg@antrazal.com)
*  @Company        : Antrazal
*  @Description    : Sets up the Express server with CORS and routes. 
*                    Defines the home route and initializes the server 
*                    to listen on port 5000.
*  @return         : void
*********************************************************
*/
const express = require('express');
const cors = require('cors');
const db = require('./db'); 
const contactRoutes = require('./routes/contact.routes'); 

const app = express();
const port = 5000;

/*
*********************************************************
*  @Method Name    : CORS Middleware
*  @Author         : Akshay Garg (akshay.garg@antrazal.com)
*  @Company        : Antrazal
*  @Description    : Enables Cross-Origin Resource Sharing (CORS) 
*                    with a wildcard '*' for all origins. For production, 
*                    it is recommended to restrict origins.
*  @return         : void
*********************************************************
*/
app.use(cors({
    origin: '*' 
  }));
  /*
*********************************************************
*  @Method Name    : JSON Middleware
*  @Author         : Akshay Garg (akshay.garg@antrazal.com)
*  @Company        : Antrazal
*  @Description    : Middleware to parse incoming requests with JSON payloads.
*  @return         : void
*********************************************************
*/
app.use(express.json());

/*
*********************************************************
*  @Method Name    : Contact Routes
*  @Author         : Akshay Garg (akshay.garg@antrazal.com)
*  @Company        : Antrazal
*  @Description    : Routes for handling CRUD operations on contacts.
*                    All routes are prefixed with "/api".
*  @return         : void
*********************************************************
*/
app.use('/api', contactRoutes);

/*
*********************************************************
*  @Method Name    : Home Route
*  @Author         : Akshay Garg (akshay.garg@antrazal.com)
*  @Company        : Antrazal
*  @Description    : Default route for checking if the API server is running.
*  @return         : Response with a text message
*********************************************************
*/
app.get('/', function(req, res) {
  res.send('Contact Management API is running...');
});

/*
*********************************************************
*  @Method Name    : Server Start
*  @Author         : Akshay Garg (akshay.garg@antrazal.com)
*  @Company        : Antrazal
*  @Description    : Starts the Express server on port 5000 and logs the 
*                    server's URL to the console.
*  @return         : void
*********************************************************
*/
app.listen(port, function() {
  console.log(`Server is running on http://localhost:${port}`);
});
