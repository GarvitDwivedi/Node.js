const cookieParser = require('cookie-parser');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express() ;
app.use(cookieParser());

// app.get('/' , (req , res) =>{
//     res.cookie("name" , "Garvit");
//     res.send("Hello World")
// })
// app.get('/read' , (req , res)=>{
//     console.log(req.cookies);
    
//     res.send("Hello Read");
// })

// bcrypt.genSalt(10, function(err, salt) {
//     console.log(salt);
    
//     bcrypt.hash("Garvit", salt, function(err, hash) {
//         console.log(hash);
//     });
// });

// bcrypt.compare("Garvi", "$2b$10$8M5Z4Gmgd1Q/OAMPilBh0.CS7x6mPgZwZFkVr7MdtjolC96ygZ.HS", function(err, result) {
//     console.log(result);
    
// });

app.get('/' ,  (req , res)=>{
    const token = jwt.sign({email : "Garvit@123.com"} , "secretkey")
    res.cookie("token" , token);
    console.log(token);
    
    res.send("Done")
})

app.get('/read' , (req , res)=>{
    console.log(req.cookies);
    
    let data = jwt.verify(req.cookies.token , "secretkey")
    console.log(data);
    res.send("Hello");
    
})
app.listen(3000 , ()=>{
    console.log("Starting");
})

