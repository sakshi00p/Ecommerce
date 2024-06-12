let mongoose=require("mongoose")

let prodsch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "desc":String,
    "price":Number,
    "pimg":String,
    "cat":String,
    "gen":String,
    "comm":[]
})

let product=mongoose.model("products",prodsch)
module.exports=product