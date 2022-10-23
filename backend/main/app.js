const express=require("express")
const amqp=require('amqplib')
const {Main} =require("./model/main")
const {productUser}=require("./model/like")
const connection=require("./db")
const likes=require("./like")
const app=express()
const cors=require("cors")
var channel,con

connection()
connect()

app.use(express.json());
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
app.use(likes)
async function connect(){
    try {
        const amqpSever=process.env.RABBIT
        con=await amqp.connect(amqpSever)
        channel=await con.createChannel()
        await channel.assertQueue("create")
        await channel.assertQueue("delete")
        await channel.assertQueue("update")

        //create
        channel.consume("create",async data=>{
            const product=await JSON.parse(data.content.toString())
            console.log(product._id+" create")
            const main = new Main({
                product_id:product._id,
                title:product.title,
                image:product.image,
            })
            await main.save()

            
            const prod=new productUser({
                product_id:product._id,
            })
            prod.save()
            await channel.ack(data)
        })

        //Update
         channel.consume("update",async data=>{
            const product=await JSON.parse(data.content.toString())
            console.log(product)
            await Main.updateMany({product_id:product.id},{title:product.title,image:product.image})
             await channel.ack(data)
        })

        //Delete
         channel.consume("delete",async data=>{
           const product=await `${Buffer.from(data.content)}`
           //console.log(product)
            await Main.deleteOne({product})
            console.log("Sucessfull")
           
            await productUser.deleteOne({product})
            console.log("Sucessfull")
            await channel.ack(data)

        })

        
    } catch (error) {
        console.log(error)
    }   
}

app.listen(9090,()=>{
    console.log("Listening on port 9090")
})