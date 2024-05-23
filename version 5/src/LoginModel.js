
const mongoose = require("mongoose");
const { type } = require("os");
const { collectionNames } = require("./config");



const LoginSchema = new mongoose.Schema({
     name:{
        type:String,
        required:true
     },

     password:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true
     },

     score:{
        type:Number 
         
     }
     

})



const LoginModel = mongoose.model("LoginModel", LoginSchema,collectionNames.loginCollection);
module.exports = LoginModel;

 

