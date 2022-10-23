const mongoose=require("mongoose")
module.exports=()=>{
    const connectionParams={
        useUnifiedTopology:true,
        useNewUrlParser:true
    }
    try{
        mongoose.connect(process.env.MONGODB)
        console.log("Connected to dabase")

    }catch(error){
        console.log(error)
    }
}