const mongoose=require("mongoose");
const likeSchema=new mongoose.Schema({
    product_id:String,
    user:Array
});

const productUser=mongoose.model("productUser",likeSchema);

module.exports={productUser}