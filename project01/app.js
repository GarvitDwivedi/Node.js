const express = require('express');
const app = express() ;
const path = require('path');
const userModel = require('./models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const postModel = require('./models/post')
const cookieparser = require('cookie-parser')

app.set("view engine" , "ejs" )
app.use(express.json());
app.use(cookieparser())
app.use(express.urlencoded({extended :true }));
app.use(express.static(path.join(__dirname , 'public')));

app.get('/' , (req , res)=>{
    res.render("index");
})

app.get('/login'  ,(req , res)=>{
    res.render('login');
})

app.post('/login' , async(req , res)=>{
    let {email , password} = req.body ;
    const user =await userModel.findOne({email});
    if(!user)res.status(500).send("Something Went Wrong");

    bcrypt.compare(password, user.password, function(err, result) {
        if(result){
            let token =  jwt.sign({email : email,userid : user._id }  , "shhhh");
            res.cookie("token" , token);   
            res.redirect('/profile')
        }else{
            res.redirect('/login')
        }
    })
})

app.post('/register' , async(req , res)=>{
    let {name , email , username , age , password} = req.body ;
    let user =await   userModel.findOne({email});
    if(user)res.status(500).send("Already Registed");
    bcrypt.genSalt(10 , (err , salt)=>{
        bcrypt.hash(password ,salt ,  async(err , hash)=>{
            let user = await userModel.create({
                name , 
                username , 
                email , 
                age , 
                password : hash ,
            })
            let token =  jwt.sign({email : email,userid : user._id }  , "shhhh");
            res.cookie("token" , token);
            res.send("Done");
        })
    })

    


})

app.get('/logout' , async(req , res)=>{
    res.cookie("token"  ,"");
    console.log(req.cookies);
    res.redirect('/login');
})

app.post('/post', isLogedin , async(req , res)=>{
    const user =await userModel.findOne({email: req.user.email});
    let post = await postModel.create({
        user : user._id ,
        content : req.body.content,
    })
    user.posts.push(post._id);
    await user.save() ;
    res.redirect('/profile')
})


app.get('/like/:id' ,isLogedin ,async(req , res)=>{
    let post = await postModel.findOne({_id : req.params.id}).populate("user");
    if(post.likes.indexOf(req.user.userid) === -1){
        post.likes.push(req.user.userid);
    }else{
        post.likes.splice(post.likes.indexOf(req.user.userid) , 1 );

    }
    await post.save() ;
    res.redirect('/profile');
})


app.get('/edit/:id' ,isLogedin ,async(req , res)=>{
    let post = await postModel.findOne({_id : req.params.id}).populate("user");
    res.render('edit' , {post});

})

app.post('/update/:id' ,isLogedin ,async(req , res)=>{
    let post = await postModel.findOneAndUpdate({_id : req.params.id} , {content : req.body.content});
    res.redirect('/profile');

})


app.get('/profile' ,isLogedin ,async(req , res)=>{
    let user = await userModel.findOne({email : req.user.email}).populate("posts");
    res.render('profile' ,{user});
})

function isLogedin(req , res , next){
    if(req.cookies.token === ""){
        res.redirect("/login")    
    }else{
        let data = jwt.verify(req.cookies.token , "shhhh");
        req.user = data ;
    }
    next() ;
}
app.listen(3000 , ()=>{
    console.log("starting");
})