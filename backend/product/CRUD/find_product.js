require("dotenv").config()
const router=require("express").Router()
const {Product}=require("../model/product")
const isAuth=require("../../isAuth")

router.get(process.env.FINDONE,isAuth,async(req,res)=>{
    console.log(req.params.id)
    try{
        const product=await Product.findById(req.params.id)
        res.json(product)
    }catch(err){
        console.log(err)
    }

})

module.exports=router