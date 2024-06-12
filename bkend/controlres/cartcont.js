let cart=require("../models/cartmodel")
let {v4:uuidv4}=require("uuid")

let addtocart=async(req,res)=>{
    try{
        let obj=await cart.find({"uid":req.body.uid,"pid":req.body.pid})
        if(obj.length==0){
        let cid=uuidv4()
        let data=new cart({...req.body,"_id":cid})
        await data.save()
        res.json({"msg":"prodect added to cart"})
        }
        else{
            await cart.findByIdAndUpdate({"_id":obj[0]._id},{"qty":obj[0].qty+1})
            res.json({"msg":"qty inc"})
        }
    }
    catch(err){
        console.log(err)
    }
}

let getcart=async(req,res)=>{
    try{
        let data=await cart.find({"uid":req.params.uid})
        res.json(data)
    }
    catch(err){
        console.log(err)
    }
}

let delcart=async(req,res)=>{
    try{
        await cart.findByIdAndDelete({"_id":req.params.cid})
        res.json({"msg":"product deleted from cart"})
    }
    catch(err){
        console.log(err)
    }
}

let inc=async(req,res)=>{
    try{
    await cart.findByIdAndUpdate({"_id":req.params.cid},{$inc:{"qty":1}})
    res.json({"msg":"qty incremented"})
    }
    catch(err){
        console.log(err)
    }
}

let dec=async(req,res)=>{
    try{
        await cart.findByIdAndUpdate({"_id":req.params.cid},{$inc:{"qty":-1}})
        res.json({"msg":"qty decremented"})
    }
    catch(err){
        console.log(err)
    }
}
module.exports={addtocart,getcart,delcart,inc,dec}