const express = require("express");
const connection = require("../connection");
const router = express.Router();
router.use(express.json());

const jwt = require("jsonwebtoken");
require('dotenv').config();

const auth = require("../services/authentication");
const checkRole = require("../services/checkRole");


//  Register 
router.post("/signup", (req, res) => {
  let user = req.body;
  query = "SELECT email,password,role,status FROM user WHERE email=?";
  connection.query(query,[user.email],(err, results) => {
    if (!err) {
      if (results.length <= 0) {
        query =
          "INSERT INTO user(name,contactNumber,email,password,status,role) VALUES(?,?,?,?,'false','user')";
        connection.query(
          query,
          [user.name, user.contactNumber, user.email, user.password],
          (err, results) => {
            if (!err) {
              return res
                .status(200)
                .json({ message: "Registered Successfully!" });
            } else {
              return res.status(500).json(err);
            }
          }
        );
      } else {
        return res.status(400).json({ message: "Eamail Allready exists!" });
      }
    } else {
      return res.status(500).json();
    }
  });
});

// Login
router.post('/login' , (req, res)=>{
    let user = req.body;
    query =  "SELECT email,password,role,status from user where email=?";
    connection.query(query , [user.email],(err , results)=>{
        if(!err){
            if(results.length <= 0 || results[0].password !== user.password){
                return res.status(401).json({mesage:"Incorrect username or password"})
            }else if(results[0].status === 'false'){
                return res.status(401).json({message:"Wait for the Admin Approval to"})
            }else if(results[0].password === user.password){
                const response = {email:results[0].email , role:results[0].role}
                const accesssToken = jwt.sign(response , process.env.ACCESS_TOKEN , {expiresIn:'8h'})
                res.status(200).json({accesssToken})
            }else{
                res.status(400).json({message:"Something went wrong"})
            }
        }else{
            return res.status(500).json(err);
        }
    })
})

// Get all users

router.get("/getAllUsers" ,auth.authenticateToken ,checkRole.checkRole , (req , res)=>{
    console.log(res)
    var query = "SELECT id,name,email,contactNumber,status FROM user where role='user'";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results)
        }else{
            return res.status(500).json(err)
        }
    })
})

module.exports = router;
