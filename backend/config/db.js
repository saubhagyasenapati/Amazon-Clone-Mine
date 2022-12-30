const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config({path:"backend/config/config.env"});


const connectToMongo=()=>{

    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("MongoDB connection succesful");
    })
}

module.exports=connectToMongo