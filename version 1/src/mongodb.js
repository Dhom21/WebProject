
const mongoose = require("mongoose");
const { type } = require("os");

mongoose.connect("mongodb://localhost:27017/mydatabase7")

.then(()=>{
    console.log("mongodb connected..");
})

.catch(()=>{
    console.log("faild to connect");
})


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
     }


})


const collectionUser = new mongoose.model("users",LoginSchema)
module.exports = collectionUser 

