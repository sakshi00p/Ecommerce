let multer=require("multer")
let {v4:uuidv4}=require("uuid")
let product=require("../models/productmodel")
let cart=require("../models/cartmodel")
let fs=require("fs")

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./prodimgs')
    },
    filename:function(req,file,cb){
        const uniqueSuffix=Date.now()+'-'+Math.round(Math.random()*1E9)
        cb(null,file.fieldname+'-'+uniqueSuffix+"."+file.mimetype.split("/")[1])
    }
})

const upload=multer({storage:storage})

let addprod=async(req,res)=>{
    try{
        let pid=uuidv4()
        let data=new product({"_id":pid,...req.body,"pimg":req.file.filename})
        await data.save()
        res.json({"msg":"product added"})
    }
    catch(err){
        console.log(err)
    }
}

let getprod=async(req,res)=>{
    try{
        let data=await product.find({})
        res.json(data)
    }
    catch(err){
        console.log(err)
    }
}

let getfilter=async(req,res)=>{
    try{
        let data=await product.find({"cat":req.params.cat})
        res.json(data)
    }
    catch(err){
        console.log(err)
    }
}

let getbygen=async(req,res)=>{
    try{
        let data=await product.find({"gen":req.params.gen})
        res.json(data)
    }
    catch(err){
        console.log(err)
    }
}

let sortdesc=async(req,res)=>{
    try{
        let data=await product.find({})
        data.sort((a,b)=>{
            return b.price-a.price
        })
        res.json(data)
    }
    catch(err){
        console.log(err)
    }
}

let sortasc=async(req,res)=>{
    try{
        let data=await product.find({})
        data.sort((a,b)=>{
            return a.price-b.price
        })
        res.json(data)
    }
    catch(err){
        console.log(err)
    }
}


let deleteprod=async(req,res)=>{
    try{
        await product.findByIdAndDelete({"_id":req.params.pid})
        fs.rm(`./prodimgs/${req.params.pimg}`,()=>{})
        res.json({"msg":"product deleted"})
    }
    catch(err){
        console.log(err)
    }
}

let updateprod=async(req,res)=>{
    try{
        // let obj={...req.body}
        // delete obj["id"]
        let {name,desc,price,cat}=req.body
        await product.findByIdAndUpdate({"_id":req.body._id},{name,desc,price,cat})
        res.json({"msg":"update done"})
    }
    catch(err)
    {
        console.log(err)
    }
}

let addcom=async(req,res)=>{
    try{
        let data={...req.body}
        delete data['pid']
        await product.findByIdAndUpdate({"_id":req.body.pid},{$push:{"comm":data}})
        res.json({"msg":"comment added"})
    }
    catch(err){
        console.log(err)
    }
}

let getprodbyid=async(req,res)=>{
    try{
        let data=await product.findById({"_id":req.params.pid})
        res.json(data)
    }
    catch(err){
        console.log(err)
    }
}

let updprodimg=async(req,res)=>{
    try{
        await product.findByIdAndUpdate({"_id":req.body.pid},{"pimg":req.file.filename})
        fs.rm(`./prodimgs/${req.body.oldimg}`,()=>{})
        res.json({"msg":"product img updated"})
    }
    catch(err){
        console.log(err)
    }
}

module.exports={addprod,getprod,upload,getfilter,getbygen,deleteprod,updateprod,addcom,getprodbyid,updprodimg,sortdesc,sortasc}