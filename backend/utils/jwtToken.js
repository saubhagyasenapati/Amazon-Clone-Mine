// const sendToken=(user,statusCode,res)=>{
//     const token=user.getJWTToken();

//     //options for cookie
//     const options={
//         expires:new Date(
//             Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000
//         ),
//         httpOnly:true
//     };
//     res.status(statusCode).cookie('token',token,options).json({
//         success:true,
//         user,
//         token
//     })
// }
var jwt = require('jsonwebtoken');
const sendToken=(user,statusCode,res)=>{
    const token=user.getJWTToken();

    const data={
        user:{
          id:user.id
        }
      }
     const authToken=  jwt.sign(data,process.env.JWT_SECRET)
      res.status(statusCode).json({
        user,
        success:true,
        authToken
    })

}

module.exports=sendToken;
