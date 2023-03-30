const catchAsyncErrors = require("../middleware/catchAsyncError");
const stripe=require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

exports.processPayment=catchAsyncErrors(async(req,res,next)=>{
  try {
    console.log(req.body);
    console.log(`${process.env.STRIPE_SECRET_KEY}`);
      const myPayment=await stripe.paymentIntents.create({
         amount:req.body.amount,
         currency:"inr",
         metadata:{
          company:"Ecommerce",
         },
      });
      console.log(myPayment);
      res.status(200).json({success:true,client_secret:myPayment.client_secret});
  } catch (error) {
    console.log("stripe-routes.js 17 | error", error);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }

})

exports.sendStripeApiKey=catchAsyncErrors(async(req,res,next)=>{
  res.status(200).json({stripeApiKey:process.env.STRIPE_API_KEY});
})

// exports.processPayment=catchAsyncErrors(async(req,res,next)=>{
//   console.log("stripe-routes.js 9 | route reached", req.body);
//   let { amount, id } = req.body;
//   console.log("stripe-routes.js 10 | amount and id", amount, id);
//   try {
//     const payment = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: "inr",
//       description: "Amazon-Clone",
//       payment_method: id,
//       confirm: true,
//     });
//     console.log("stripe-routes.js 19 | payment", payment);
//     res.json({
//       message: "Payment Successful",
//       success: true,
//     });
//   } catch (error) {
//     console.log("stripe-routes.js 17 | error", error);
//     res.json({
//       message: "Payment Failed",
//       success: false,
//     });
//   }
// })
