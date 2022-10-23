require("dotenv").config()
const router=require("express").Router()
const amqp=require("amqplib")
const {Product}=require("../model/product")
const isAuth=require("../../isAuth")
var channel,connection

connect()
async function connect(){
    try {
        const amqpSever=process.env.RABBIT
        connection=await amqp.connect(amqpSever)
        channel=await connection.createChannel()
        await channel.assertQueue("update")
        await channel.assertQueue("likes")   

        channel.consume("likes",async data=>{
          const product=await JSON.parse(data.content.toString())
          console.log(product)
          await Product.updateMany({_id:product.id},{likes:product.likes})
          await channel.ack(data)
        })
    } catch (error) {
        console.log(error)
    }   
}

router.patch(process.env.UPDATE,isAuth,async function(req,res){
  await Product.updateOne({_id:req.params.id},{$set:req.body});
  res.json("updates sucessfully")
  const data={
    id:req.params.id,
    ...req.body
  }
      await channel.sendToQueue("update",Buffer.from(JSON.stringify(data)))
    //console.log(data)

})

module.exports=router