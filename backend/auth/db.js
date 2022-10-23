require("dotenv").config();
const mongoose = require("mongoose");

module.exports=()=>{
    const connectionParams={
        useNewUrlParser:true,
        useUnifiedTopology:true
    };
    try{
        mongoose.connect(process.env.MONGODB);
        console.log("Connected to database sucessfully");
    }catch(error){
        console.log(error);
        console.log("couldn't connect to database");
    }
}