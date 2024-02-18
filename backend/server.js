// Import required packages
const express = require("express");
const mysql = require("mysql2"); // Changed from 'mysql' to 'mysql2' for better compatibility
const cors = require("cors");

// Create Express application
const app = express();

// Use CORS middleware to enable cross-origin resource sharing
app.use(cors());

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3307", // Assuming MySQL is running on port 3307, change if necessary
  password: "1234",
  database: "amirpet"
});

// Define route to fetch users data
app.get('/users', (req, res) => {
  const sql = "SELECT * FROM orders"; // Assuming 'orders' is the table name
  // Execute the SQL query
  db.query(sql, (err, data) => {
    if (err) {
      // If an error occurs, send the error response
      return res.json(err);
    }
    // If successful, send the data as JSON response
    return res.json(data);
  });
});

// Define a default route
app.get('/', (req, res) => {
  // Send a simple message as the response
  return res.json("from backend");
});

// Start the Express server and listen on port 8081
app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
