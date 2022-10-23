require("dotenv").config()
const jwt_decode=require("jwt-decode")
const amqp=require("amqplib")

const {productUser} =require("./model/like")
const router=require("express").Router()
const isAuth=require(".././isAuth")
var channel,connection

connect()
async function connect(){
    try {
        const amqpSever=process.env.RABBIT
        connection=await amqp.connect(amqpSever)
        channel=await connection.createChannel()
        await channel.assertQueue("likes")    
    } catch (error) {
        console.log(error)
    }   
}


router.post(process.env.LIKE,isAuth,async(req,res)=>{
    try{
        const produt =await productUser.findOne({product_id:req.params.id})
        console.log(req.params.id)
        //Token
         const header=req.rawHeaders
        const index = header.indexOf("authorization");
        const token=(req.rawHeaders[index+1].split("Bearer ")[1])
        var likes
        // Decoded
        var user = await jwt_decode(token);
        // console.log(user._id)
        const users=produt.user   //all the user who hve liked
        // console.log(users.length)
        // console.log(users.includes(user._id))
        if(!(users.includes(user._id))){
            await users.push(user._id)
            await produt.save()
            likes=users.length
            await res.json("liked sucessfully")
            
        }else{
            await users.pull(user._id)
            await produt.save()
            likes=users.length
            res.json("disliked sucessfully")            
        }
    }catch(error){
        console.log(error)
    }
    const like={
        id:req.params.id,
        likes:likes,
    }
    await channel.sendToQueue("likes",Buffer.from(JSON.stringify(like)))
    // console.log(likes)
    console.log(like)
})
module.exports=router