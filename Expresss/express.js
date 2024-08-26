const express = require("express");

const app = express() ;


app.get("/" , function(req , res){
    res.send("Staring with Express") ;
})


app.get("/profile" , (req , res)=>{
    res.send("Profile page")
    
})

app.listen(3000);

