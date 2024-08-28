const express = require("express");
const path = require('path')
const app = express() ;
const userModel = require('./models/user');



app.set("view engine" , "ejs" )
app.use(express.json());
app.use(express.urlencoded({extended :true }));
app.use(express.static(path.join(__dirname , 'public')));



app.get('/' , (req,  res) =>{
    res.render("index");
})

app.get('/read' , async(req , res) =>{
    let users = await userModel.find();
    res.render('read' , {users});
})

app.post('/create' , async(req , res) =>{
    let {name , email , imageurl} = req.body ;
    let createUser = await userModel.create({
        name : name,
        email : email ,
        imageurl : imageurl
    })

    res.redirect('/read');

})

app.get('/delete/:id' , async(req , res)=>{
    let user = await userModel.findOneAndDelete({_id : req.params.id});
    res.redirect('/read');
})

app.get('/edit/:userid'  , async(req , res)=>{
    let user = await userModel.findOne({_id : req.params.userid})
    res.render('edit' , {user});
})


app.post('/update/:userid' , async(req , res) =>{
    let {name , email , imageurl} = req.body ;
    let updateuser = await userModel.findOneAndUpdate({_id : req.params.userid} , {name, email , imageurl} , {new : true});
    res.redirect('/read');

})

app.listen(3000 , function(){
    console.log("Starting")
})
