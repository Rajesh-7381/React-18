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
        // res.json({message:'login successful!',redirectTo:'/dashboard'});
        res.json({message:'login successful!'});
      }else{
        res.status(401).json({error:"invalid email or password!"})
      }
    }
  })
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


// Start the Express server and listen on port 8081
app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
