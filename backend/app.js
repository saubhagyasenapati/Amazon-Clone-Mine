const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectToMongo = require("./config/db");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoutes");
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/paymentRoute");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
dotenv.config({ path: "backend/config/config.env" });

//Handling Uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Shutting down the server due to Uncaught exception");
  process.exit(1);
});
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());
//Route Imports
connectToMongo();
app.use("/api/v1", productRoute);
app.use("/api/auth", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);

app.use(express.static(path.join(___dirname,"../frontend/build")))
app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
})
//MiddleWare for error
app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
  console.log(`Server is Working on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Shutting down the server due to unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
