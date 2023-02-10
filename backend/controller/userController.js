const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors=require("../middleware/catchAsyncError");
const User=require("../Models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail=require("../utils/sendEmail");
const crypto =require("crypto");
const  cloudinary  = require("../config/cloudinary");
//Register Our User

exports.registerUser=catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password}=req.body;
    console.log(req.body.avatar);
    const myCloud=await cloudinary.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale",
    });
   
    const user=await User.create({
        name,email,password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        }
    
    })
   
    sendToken(user,201,res)
})


exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;

    if(!email||!password){
        return next(new ErrorHandler("Please Enter Email And Password ",400))
    }

    const user= await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }

    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
    }

    sendToken(user,200,res)
})


exports.logout=catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:'Logged Out',
    });
})

exports.forgotPassword=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.body.email);
   const user=await User.findOne({email:req.body.email});
   if(!user)
   {
    return next(new ErrorHandler("User not found",404))
   }

   //Get ResetPasswordToken
   const resetToken=user.getResetPassswordToken();
   await user.save({validateBeforeSave:false});
   const resetPasswordUrl=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
   const message=`Your Password reset token is :-\n\n${resetPasswordUrl}\n\n if Not requested Kindly ignore it`;

   try{
       await sendEmail({
           email:user.email,
           subject:"Ecommerce Password Recovery",
           message
       })
      
       res.status(200).json({
        success:true,
        message:`Email Send to ${user.email} successfully`
       })
   }
   catch{
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save({validateBeforeSave:false});
    return next(new ErrorHandler(error.message,500));
   }

})

exports.resetPassword=catchAsyncErrors(async(req,res,next)=>{
    //creating token hash
    console.log(req.body);
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user=await User.findOne({
      resetPasswordToken,resetPasswordExpire:{$gt:Date.now()}
    })

    if(!user)
    {
        return next(new ErrorHandler("Reset Password is Invalid or expired"))
    }
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Password Doesn't Match"))
    }

    user.password=req.body.password;
    user.resetPasswordExpire=undefined;
    user.resetPasswordToken=undefined;
    await user.save();
    sendToken(user,200,res)
})

exports.getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    });
});

exports.updatePassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");
    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is Incorrect",401))
    }

    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not Match",400))
    }

    user.password=req.body.newPassword ;

    await user.save();

    sendToken(user,200,res)
   
});

exports.updateUserProfile=catchAsyncErrors(async(req,res,next)=>{
   
  const newUserData={
    name:req.body.name,
    email:req.body.email
  }
  //Cloudnery 
  if(req.body.avatar!=="")
  {
    const user=await User.findById(req.user.id);
    const imageId=user.avatar.public_id;
    await cloudinary.uploader.destroy(imageId);
    const myCloud=await cloudinary.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale",
    });
    newUserData.avatar={
        public_id:myCloud.public_id,
        url:myCloud.secure_url,
    }
  }
  const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false,
  })
   
  res.status(200).json({
    success:true,

  })
   
});

//get all users(admin)
exports.getAllUser=catchAsyncErrors(async(req,res,next)=>{
    const users=await User.find();

    res.status(200).json({
        success:true,
        users,
    });
});

//get single users(admin)
exports.getSingleUser=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User does not exist with ID:${req.params.id}`),400)
    }
    res.status(200).json({
        success:true,
        user,
    });
});

//getUpdate User Role(admin)
exports.UpdateRole=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
      }


      const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
      })
       
      if(!user){
        return next(new ErrorHandler(`User does not exist with ID:${req.params.id}`),400)
    }
      res.status(200).json({
        success:true,
      })
});

exports.DeleteUser=catchAsyncErrors(async(req,res,next)=>{
    
      const user=await User.findById(req.params.id);
      
      if(!user){
        return next(new ErrorHandler(`User does not exist with ID:${req.params.id}`),400)
    }
    const imageId=user.avatar.public_id;
    await cloudinary.uploader.destroy(imageId);
      await user.remove();

      res.status(200).json({
        success:true,
        message:"Deleted Successfully"
      })
});