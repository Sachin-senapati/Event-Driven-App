require("dotenv").config()
const express=require("express")
const app=express()
const cors=require("cors")
const connection=require("./db")
const signup=require("./Signup")
const Login=require("./Login")
connection()


app.use(express.json())
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
app.use(process.env.SIGNUP,signup)
app.use(process.env.LOGIN,Login)

app.listen(7070,()=>{
    console.log("Listion on port 7070")
})