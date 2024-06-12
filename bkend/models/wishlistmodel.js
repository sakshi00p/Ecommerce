let mongoose=require("mongoose")

let wishlistsch=new mongoose.Schema({
    "_id":String,
    "pid":String,
    "uid":String,
    "name":String,
    "desc":String,
    "price":Number,
    "pimg":String,
    "cat":String
})

let wishlist=mongoose.model("wishlist",wishlistsch)
module.exports=wishlist