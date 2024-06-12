let mongoose=require("mongoose")

let cartsch=new mongoose.Schema({
    "_id":String,
    "pid":String,
    "uid":String,
    "name":String,
    "desc":String,
    "price":Number,
    "pimg":String,
    "cat":String,
    "qty":Number
})

let cart=mongoose.model("cart",cartsch)
module.exports=cart
