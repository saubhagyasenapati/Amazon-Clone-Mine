const Order = require("../Models/orderModel");
const Product=require("../Models/productModels")
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const sendEmail=require("../utils/sendEmail");
const User=require("../Models/userModel");

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  const user=await User.findById(order.user);
  const orderUrl=`${process.env.FRONTEND_URL}/order/${order._id}`;
  const message=`Your order has been placed successfully with us :-\n\n Order can be viewed at ${orderUrl} \n\n Total items:${order.orderItems.length}\n\n Total Amount:${order.totalPrice} `;
   try{
       await sendEmail({
           email:user.email,
           subject:"Ecommerce Password Recovery",
           message
       })
      }
      catch(error){
        console.log("Email not sent")
      }
  
      
  res.status(201).json({
    success: true,
    order,
  });
});


//Get Single Order

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found"));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//Get logged in user Orders

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//get All Orders --Admin

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//Update Order Status --Admin

exports.updateOrder = catchAsyncErrors(async(req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found"));
  }
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have Already Delevired this order", 400));
  }

  order.orderStatus = req.body.status;
  if (order.orderStatus === "Shipped") {
  order.orderItems.forEach(async (o) => {
    await updateStock(o.product, o.quantity);
  });}

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.Stock = product.Stock - quantity;
  await product.save({ validateBeforeSave: false });
}

//Delete Order --Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found"));
  }

  await order.remove();

  res.status(200).json({
    success: true,
    message: "Deleted Succesfully",
  });
});
