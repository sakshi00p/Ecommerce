let wishlist=require("../models/wishlistmodel")
let {v4:uuidv4}=require("uuid")

let addtowish=async(req,res)=>{
    try{
    let wid=uuidv4()
    let data=new wishlist({...req.body,"_id":wid})
    await data.save()
    res.json({"msg":"product added to wishlist"})
    }
    catch(err){
        console.log(err)
    }
}

let getwish=async(req,res)=>{
    try{
    let data=await wishlist.find({"uid":req.params.uid})
    res.json(data)
    }
    catch(err){
        console.log(err)
    }
}

let delwish=async(req,res)=>{
    try{
        await wishlist.findByIdAndDelete({"_id":req.params.wid})
        res.json({"msg":"product removed from wishlist"})
    }
    catch(err){
        console.log(err)
    }
}

module.exports={addtowish,getwish,delwish}