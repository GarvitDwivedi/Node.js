const express = require("express");
const router = express.Router();
const ownerModel = require('../models/owner-model')

router.get('/' , (req , res)=>{
   res.send("Owner Router Working");
})
if((process.env.NODE_ENV)  === "development"){
   router.post('/create' , async (req , res)=>{
      let owners= await ownerModel.find();
      if(owners.length > 0){
         return res
         .status(503)
         .send("You dont have permission to create a new owner");
      }

      let {fullname , email , password} = req.body();
      let createOwner = await ownerModel.create({
        
         fullname ,
         email ,
         password ,
      })
      res.status(201).res.send(createOwner);
   })
} 

module.exports = router;
