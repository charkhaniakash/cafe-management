const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.post('/signup' , (req ,res)=>{
    let user = req.dody;
    query = "SELECT email , password , role, status FROM user WHERE email=? "
    connection.query(query , [user.email],(err, res)=>{
        if(!err){
            if(res.length <= 0){
                query = "INSERT INTO user(name , email , contactNumber , email , password , status , role) VALUES(?,?,?,?,?,'false','user')"
                connection.query(query , [user.email,user.name,user.contactNumber,user.email,user.password],(err, res)=>{
                    if(!err){
                        return res.status(200).json({message:"Registered Successfully!"})
                    }else{
                        return res.status(500).json(err);
                    }
                })
            }else{
                return res.status(400).json({message:"Eamail Allready exists!"})
            }
        }
        else{
            return res.status(500).json()
        }
    })
})

module.exports = router;