const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt=require("jsonwebtoken");
const User = require("../Models/userModel");

exports.isAuthenticatedUser=catchAsyncError(async(req,res,next)=>{
    //get the user from authtoken and add ID to req object
    const token=req.header('auth-token')
    console.log(token)
    if(!token){
        return next(new ErrorHandler("Please Login to continue Shopping",401)) 
     }
    try {
        const data=jwt.verify(token,process.env.JWT_SECRET);
        console.log(data.user.id)
        req.user=await User.findById(data.user.id);
        next()  ;
    } catch (error) {
        return next(new ErrorHandler("Please Login to continue Shopping",401)) 
    }
    
})

// exports.isAuthenticatedUser=catchAsyncError(async(req,res,next)=>{

//     const {token}=req.cookies;
    
//     if(!token){
//        return next(new ErrorHandler("Please Login to continue Shopping",401)) 
//     }

//     const decodedData=jwt.verify(token,process.env.JWT_SECRET)

//     req.user=await User.findById(decodedData.id);
//     next();

// })


exports.authorizeRoles=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next( new ErrorHandler(`Role:${req.user.role} is not allowed to access this resource`,403))
        }
        next();
    }
   
}