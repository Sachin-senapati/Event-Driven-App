require("dotenv").config()
const router=require("express").Router()
const amqp=require('amqplib')
const {Product}=require("../model/product")
const isAuth=require("../../isAuth")


var channel,connection

//  RabbitMQ
connect()
async function connect(){
    try {
        const amqpSever=process.env.RABBIT
        connection=await amqp.connect(amqpSever)
        channel=await connection.createChannel()
        await channel.assertQueue("delete")    
    } catch (error) {
        console.log(error)
    }   
}

router.delete(process.env.DELETE,isAuth,async(req,res)=>{
    try{
        console.log(req.params.id)
        const product=await Product.deleteOne({_id:req.params.id})
        await channel.sendToQueue("delete",Buffer.from(req.params.id))
        res.json("Sucessfully deleted")
    }catch(err){
        console.log(err)
    }

})

module.exports=router