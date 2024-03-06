// Import required packages
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

// These modules are commonly used together in web applications for implementing authentication mechanisms using JWTs and handling cookies for session management.
const cookiParser=require("cookie-parser");
const jwt=require("jsonwebtoken");

// process.env.JWT_SECRET_KEY: process.env is an object provided by Node.js that represents the user's environment.
//  JWT_SECRET_KEY is a custom environment variable used to store the secret key for JWT (JSON Web Token) encryption and decryption.
//  By accessing process.env.JWT_SECRET_KEY, the code tries to retrieve the value of this environment variable.
const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY || "AMIRPET";

// Create Express application
const app = express();

// Use CORS middleware to enable cross-origin resource sharing
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// it enables express application to parse cookies form incoming requests
app.use(cookiParser());

// Create a connection to the MySQL database
// createpool coonect with multiple databse ,it does not create new connection
const db = mysql.createPool({
// const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3307",
  password: "1234",
  database: "amirpet"
});



// db.connect(err=>{
//   if(err){
//     console.error("not connected",err);
//     return;
//   }
//   console.log('Connected to MySQL database');  
// })




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





// login

app.post('/login',(req,res)=>{
  const values=[req.body.email,req.body.password];
  const query="select * from signup where email=? and password=?";
  db.query(query,values,(err,data)=>{
    if(err){
      console.error("error creating user",err);
      return res.status(500).json({error:"internal server error"});
    }else{
      if(data.length > 0){
        // Generate JWT token with user's email as payload, set to expire in 1 hour
        const token=jwt.sign({email:req.body.email},JWT_SECRET_KEY,{expiresIn:'1h'});
        // console.log(token)
        // Set the token as an HTTP-only cookie in the response
        res.cookie('token',token,{httpOnly:true});
        res.json({message:'login successful!',token:token});
      }else{
        res.status(401).json({error:"invalid email or password!"})
      }
    }
  });

  // Check if the cookie is set
  // console.log("Cookie:", res.getHeaders()["set-cookie"]);
  
});


// getdata
app.get('/userdata', (req, res) => {
  const query = "SELECT * FROM signup ";
  db.query(query, (err, data) => {
    if (err) {
      return res.json({ message: "Internal Server Error" });
    }
    return res.json(data);
  });
});




// delete data
app.delete('/deletedata/:id',(req,res)=>{
  const id=req.params.id;
  const query="delete from signup where id=?";
  db.query(query,id,(err,data)=>{
    if(err){
      console.error("Error deleting user:", err);
    }else{
      return res.status(200).json({ message: "User deleted successfully!" });
    }
  })
})


app.get('/induserdata/:id', (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM signup WHERE id=?";
  db.query(query, [id], (err, data) => {
    if (err) {
      res.status(402).json("error");
    } else {
      res.status(201).json(data);
    }
  });
});



// get single email
app.get("/check-email/:email", (req, res) => {
  const email = req.params.email;
  const sql = "SELECT email FROM signup WHERE email = ?";
  db.query(sql, [email], (err, data) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (data.length > 0) {
        // Email exists
        return res.status(200).json({ message: "Email exists" });
      } else {
        // Email does not exist
        return res.status(404).json({ error: "Email not found" });
      }
    }
  });
});


// Start the Express server and listen on port 8081
app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
