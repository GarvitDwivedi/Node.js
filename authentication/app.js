const express = require('express');
const app = express() ;
const path = require('path');
const userModel = require('./models/user');
const bcrypt = require('bcrypt')
const cookie = require('cookie-parser')
const jwt = require('jsonwebtoken')


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.set('view engine' , 'ejs');
app.use(express.static(path.join(__dirname , 'public')));


app.get('/' , async(req , res)=>{
    res.render("index")
})

app.post('/create' , (req , res)=>{
    let{name , email , password , age} = req.body;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            let createUser = await userModel.create({
                name , 
                email , 
                password : hash ,
                age
            })

            let token  = jwt.sign(email , "String");
            res.cookie("token" , token);
            console.log(token);     
            res.send(createUser);
        });
        
    });

})

app.get('/logout' , (req , res)=>{
    res.cookie("token" , "") ;
    res.redirect('/');
})


app.get('/login' , (req , res)=>{
    res.render("login");
})

app.post('/login' , async (req , res)=>{
    const user = await userModel.findOne({email : req.body.email});
    if(!user) return res.send("Something Went Wrong");

    bcrypt.compare(req.body.password , user.password , function(err , result){
        if(result){
        let token  = jwt.sign({email :user.email } , "String");
        res.cookie("token" , token);
        res.send("Yes you can Login");
    }

        else return res.send("Something Wend Wrong");
    })
})


app.listen(3000 , ()=>{
    console.log("Running");
})
