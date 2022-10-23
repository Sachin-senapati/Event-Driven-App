const mongoose=require("mongoose");
module.exports=()=>{
    const connectionParams={
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    try{
        mongoose.connect(process.env.MONGODB)
        console.log("sucesssfully connected to databse")

    }
    catch(error){
        console.log(error)
    }
}