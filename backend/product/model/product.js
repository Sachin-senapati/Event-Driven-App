const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    title:String,
    image:String,
    likes:{type:Number,default:0 }
})

const Product=mongoose.model("product",productSchema);

module.exports={Product};