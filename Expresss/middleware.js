const express = require("express");

const app = express() ;


app.use(function(req , res , next){
    console.log("Starting with middleware");
    next();
})


app.use(function(req , res , next){
    console.log("Starting with middleware 2nd");
    next();
})



app.get("/" , function(req , res){
    res.send("Staring with Express") ;
})


app.get("/profile" , (req , res)=>{
    res.send("Profile page")
    
})

app.listen(3000);

