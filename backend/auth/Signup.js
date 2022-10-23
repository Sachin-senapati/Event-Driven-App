const router=require("express").Router();
const {User,validate}=require("./model/User")
const bcrypt=require("bcrypt")


router.post("/",async(req,res)=>{
   try{
    const {error}=validate(req.body)
    if(error){
        return res.status(400).send({message: error.details[0].message});
    }
    console.log({email:req.body.email})
    const user=await User.findOne({email:req.body.email})
    if(user){
        return res.status(200).send({message:"User already exist"})
    }else{
        const hashPassword=await bcrypt.hash(req.body.password,10)
        await new User({...req.body,password:hashPassword}).save()
        return res.status(400).send({message:"created sucessfully"})
    }
   }
   catch(error){
    if(error){
        console.log(error)
        return res.status(200).send({message:"internal server error"})
    }
   }
})

module.exports=router