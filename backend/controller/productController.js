const Product = require("../Models/productModels");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("../config/cloudinary");

//Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  // req.body.user = req.user.id;
  // const product = await Product.create(req.body);
  // res.status(201).json({
  //   success: true,
  //   product,
  // });

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLink = [];
  for (let i = 0; i < images.length; ++i) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLink;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
//GET ALL PRODUCTS ADMIN
exports.getAdminProducts = catchAsyncErrors(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

//Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 8;
  // return next(new ErrorHandler("Product not found", 404));
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
  });
});

//Update Product -- Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not Found",
    });
  }
  let images=[];
  if(typeof req.body.images==="string"){
    images.push(req.body.images);
  }
  else{
    images=req.body.images;
  }

  if(images!==undefined){

    for(let i=0;i<2;i++)
    {
        const result=await cloudinary.uploader.destroy(
          product.images[i].public_id
        );
    }
    const imagesLink=[];
    for(let i=0;i<images.length;++i){
      const result=await cloudinary.uploader.upload(images[i],{
        folder:"products",
    });
    imagesLink.push({
      public_id:result.public_id,
      url:result.secure_url,
    });
    }
    req.body.images=imagesLink;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Get Product Details
exports.GetAProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete a Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  for (let i = 0; i < product.images.length; i++) {
    const result = await cloudinary.uploader.destroy(
      product.images[i].public_id
    );
  }
  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Deleted successfully",
  });
});

// exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
//   console.log(req);
//   const product = await Product.findById(req.params.id);
//   if (!product) {
//     return res.status(500).json({
//       success: false,
//       message: "Product not found",
//     });
//   }

//   await product.remove();

//   res.status(200).json({
//     success: true,
//     message: "Product Deleted successfully",
//   });
// });
//Create New Review or Update the Review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.rating = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// Get All Reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Review

exports.deleteReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id
  );
  let avg=0;
  reviews.forEach((rev)=>{
    avg+=rev.rating;
  });
  let rating = 0;
 if(reviews.length===0){
  rating=0;
 }
 else{
 rating = avg/reviews.length;
 }
  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      rating,
      numOfReviews,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res.status(200).json({
    success: true,
  });
});
