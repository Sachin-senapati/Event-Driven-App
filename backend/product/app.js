require("dotenv").config()
const express=require("express")
const cors=require("cors")
const connection=require("./db")
const app=express()

const Read=require("./CRUD/Read")
const create_product=require("./CRUD/create_product")
const find_product=require("./CRUD/find_product")
const Update=require("./CRUD/Update")
const Delete=require("./CRUD/Delete")


connection()

app.use(express.json());
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
app.use(process.env.CREATE,create_product)
app.use(process.env.FIND,Read)
app.use(find_product)
app.use(Update)
app.use(Delete)


app.listen(8080,()=>{
    console.log("Listening on port 8080")
})