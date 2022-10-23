const jwt=require("jsonwebtoken")

module.exports=async function isAuth(req,res,nex){
    const header=req.rawHeaders
    //console.log(header)
    const index = header.indexOf("authorization" || "Authorization");
    //console.log(index)
    const token=(req.rawHeaders[index+1].split("Bearer ")[1])
    //console.log(token)
    jwt.verify(token,"sachin is a good boy",(err,user)=>{
        if(err)
        return res.json({"message":err})
        else{
            req.user=user;
            nex()
        }
    })
}

//const token=(req.rawHeaders[1].split("Bearer ")[1])
//const index=header.indexOf("Authorization")