let express=require("express")
const {reg, login}=require("../controlers/usercont")
const { addprod, upload, getprod, getfilter, deleteprod, updateprod, addcom, getprodbyid, wishlist, updprodimg, getbygen, sortdesc, sortasc } = require("../controlers/prodcont")
const { addtocart, getcart, delcart, inc, dec } = require("../controlers/cartcont")
const { addtowish, getwish, delwish } = require("../controlers/wishlcont")


let route=new express.Router()

route.post("/reg",reg)
route.post("/login",login)

route.post("/addprod",upload.single("pimg"),addprod)
route.get("/getprod",getprod)
route.get("/getprod/:cat",getfilter)
route.get("/getbygen/:gen",getbygen)
route.get("/sortdesc",sortdesc)
route.get("/sortasc",sortasc)
route.delete("/deleteprod/:pid/:pimg",deleteprod)
route.put("/updateprod",updateprod)
route.put("/addcom",addcom)
route.get("/getprodbyid/:pid",getprodbyid)
route.post("/updprodimg",upload.single("pimg"),updprodimg)

route.post("/addtocart",addtocart)
route.get("/getcart/:uid",getcart)
route.delete("/delcart/:cid",delcart)
route.get("/inc/:cid",inc)
route.get("/dec/:cid/",dec)

route.post("/addtowish",addtowish)
route.get("/getwish/:uid",getwish)
route.delete("/delwish/:wid",delwish)

module.exports=route