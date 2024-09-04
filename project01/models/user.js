const mongoose = require('mongoose')  ;

mongoose.connect('mongodb://127.0.0.1:27017/userdata')

const userSchema = mongoose.Schema({
    name : String  ,
    email : String ,
    username : String  ,
    password : String ,
    age : Number ,
    profilepic : {
        type : String ,
        default : "default.png" ,
    },
    posts : [
        {type : mongoose.Schema.Types.ObjectId , ref : "post"} 
    ]
})
module.exports = mongoose.model('user' , userSchema);