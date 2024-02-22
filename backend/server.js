// Import required packages
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

// Create Express application
const app = express();

// Use CORS middleware to enable cross-origin resource sharing
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3307",
  password: "1234",
  database: "amirpet"
});

// Define route to handle form data submission
app.post('/register', (req, res) => {
  // Extract form data from request body
  const values = [req.body.fname, req.body.lname, req.body.email, req.body.uname, req.body.password, req.body.cpassword];

  // Insert form data into the database
  const query = "INSERT INTO signup (fname, lname, email, uname, password, cpassword) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(query, values, (err, data) => {
    if (err) {
      console.error("Error creating user:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    } else {
      // Send success response
      res.json({ message: "User created successfully!" });
    }
  });
});

// Start the Express server and listen on port 8081
app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
