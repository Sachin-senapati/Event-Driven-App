require("dotenv").config()
const router=require("express").Router()
const {Product}=require("../model/product")
const isAuth=require("../../isAuth")

router.get("/",isAuth,async(req,res)=>{
    try{
        const products=await Product.find()
        res.json(products)
    }catch(err){
        console.log(err)
    }

})

module.exports=router