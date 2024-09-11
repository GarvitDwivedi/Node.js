const express = require("express");
const router = express.Router();
const usermodel = require('../models/user-model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {generateToken} =  require('../utils/generateToken')

router.get('/' , (req , res)=>{
    res.send("Users Router Working");
})


router.post('/register' ,  (req ,res)=>{
    try{
        let {email , password , fullname } = req.body ;

        bcrypt.genSalt(10 , function(err , salt){
            bcrypt.hash(password , salt , async function(err , hash){
                if(err){
                    res.send(err.message)
                }
                else{
                    let user = await usermodel.create({
                        fullname ,
                        email ,
                        password : hash
                    })
                   let token = generateToken(user);
                   res.cookie("token" , token);
                   res.send("User Created Succesfully");
                }
            })

        })
       
    }catch(err){
        res.send(err.message);
    }
})


module.exports = router;

