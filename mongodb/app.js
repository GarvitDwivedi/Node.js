const express = require('express');
const app = express() ;

const userModel = require('./userData');


app.get('/' , (req , res) =>{
    res.send("Hello");
})


//CRUD Operation 


app.get('/create' , async(req , res)=>{
    const data = await userModel.create({
        name : "Garvit" ,
        email : "dwivedigarvit777@gmail.com" ,
        username : "Garvit@123" 
    })
    res.send(data)
})

app.get('/update' , async(req , res) =>{
    const updatedData = await userModel.findOneAndUpdate({username : "Garvit@123"} , {email : "garvitdwivedi777@gmail.com"} , {new : true});
    res.send(updatedData);
    
})


app.get('/read' , async(req , res) =>{
    // const readData = await userModel.find({email : "garvitdwivei777@gmail.com"});  // if it does not find it will retrun an empty ARRAY 
    const readData = await userModel.findOne({email : "garvitdwivedi777@gmail.com"}); // IF this wiil not find it will return a blank or null page
    res.send(readData)
})

app.get('/delete' , async(req , res)=>{
    const deletedData = await userModel.findOneAndDelete({username : "Garvit@123"});
   // alert("!Data Deleted Successfully")
    res.send(deletedData)
})


app.listen(3000 , function(){
    console.log("Stating");
    
})
