
const mongoose = require("mongoose");
const { type } = require("os");
const { collectionNames } = require("./config");



const ImageSchema = new mongoose.Schema({
   
 imgid:{
      type:Number
     
   },

   img:{
      type:String 
      
   }  

})

const ImageModel = mongoose.model("ImageModel", ImageSchema,collectionNames.ImageCollection);
module.exports = ImageModel;

 

