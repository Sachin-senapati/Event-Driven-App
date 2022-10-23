require("dotenv").config()
const router=require("express").Router()
const amqp=require("amqplib")
const isAuth =require("../../isAuth")
const {Product}=require("../model/product")
var channel,connection

//  RabbitMQ
connect()
async function connect(){
    try {
        const amqpSever=process.env.RABBIT
        connection=await amqp.connect(amqpSever)
        channel=await connection.createChannel()
        await channel.assertQueue("create")    
    } catch (error) {
        console.log(error)
    }   
}



router.post("/",isAuth,async(req,res)=>{
    try {
        const products=new Product({...req.body,});
        await products.save();
        await channel.sendToQueue("create",Buffer.from(JSON.stringify(products)))
        console.log(products)
        
        res.json(products)
        
    } catch (error) {
        res.send(error)
    }
    

})
module.exports=router