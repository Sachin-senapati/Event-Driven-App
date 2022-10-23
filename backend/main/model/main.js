const mongoose=require("mongoose")
const mainSchema=new mongoose.Schema({
    product_id:String,
    title:String,
    image:String,  
})

const Main=mongoose.model("product",mainSchema);

module.exports={Main};