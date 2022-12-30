const express=require("express")
const app=express();
const dotenv=require("dotenv");
const connectToMongo=require("./config/db")
const productRoute=require("./routes/productRoute");
const userRoute=require("./routes/userRoutes");
const orderRoute=require("./routes/orderRoute");
const errorMiddleware=require("./middleware/error");
const cookieParser = require("cookie-parser");
dotenv.config({path:"backend/config/config.env"});
//Handling Uncaught exception
process.on("uncaughtException",err=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to Uncaught exception");
    process.exit(1);
})
app.use(express.json())
app.use(cookieParser())
//Route Imports
connectToMongo()
app.use("/api/v1",productRoute);
app.use("/api/auth",userRoute)
app.use("/api/v1",orderRoute)
//MiddleWare for error
app.use(errorMiddleware);
app.listen(process.env.PORT,()=>{
    console.log(`Server is Working on http://localhost:${process.env.PORT}`);
})


//Unhandled Promise Rejection

process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to unhandled Promise Rejection");

    server.close(()=>{
        process.exit(1);
    })
})