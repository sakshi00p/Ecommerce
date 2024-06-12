let express=require("express")
let mongoose=require("mongoose")
let bodyParser=require("body-parser")
let cors=require("cors")
let route=require("./routes/route")

let app=express()
app.use(express.json())
app.use(cors())
app.use("/pimgs",express.static("./prodimgs"))
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb://127.0.0.1:27017/ecomdb").then(()=>{
    console.log("connected to db")
})
app.use("/",route)
app.listen(5000)
