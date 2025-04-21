const express = require('express');
const cors = require('cors');
const db = require('./db'); // DB connection
const contactRoutes = require('./routes/contact.routes'); // Contact routes

const app = express();
const port = 5000;

// Middlewares
app.use(cors({
    origin: 'http://localhost:5000' 
  }));
  
app.use(express.json());

// Routes
app.use('/api', contactRoutes);

// Home route
app.get('/', function(req, res) {
  res.send('Contact Management API is running...');
});

// Start the server
app.listen(port, function() {
  console.log(`Server is running on http://localhost:${port}`);
});
