const mongoose = require('mongoose');

let user=mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String
})
let userModel=mongoose.model("india",user);

module.exports=userModel