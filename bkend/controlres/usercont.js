let user=require("../models/usermodel")
let jwt=require("jsonwebtoken")
let bcrypt=require("bcrypt")

let reg=async(req,res)=>{
    try{
        let obj=await user.findById({"_id":req.body._id})
        if(obj){
            res.json({"err":"account already exists"})
        }
        else{
            let hashcode=await bcrypt.hash(req.body.pwd,10)
            let data=new user({...req.body,"pwd":hashcode})
            await data.save()
            res.json({"msg":"reg done"})
        }
    }
    catch(err){
        console.log(err)
    }
}

let login=async(req,res)=>{
    try{
        let obj=await user.findById({"_id":req.body._id})
        if(obj){
            let f=await bcrypt.compare(req.body.pwd,obj.pwd)
            if(f){
                res.json({"token":jwt.sign({"_id":obj._id},"abcd"),"_id":obj._id,"name":obj.name,"role":obj.role})
            }
            else{
                res.json({"err":"wrong password"})
            }
        }
        else{
            res.send({"err":"check id"})
        }
    }
    catch(err){
        console.log(err)
    }
}

module.exports={reg,login}