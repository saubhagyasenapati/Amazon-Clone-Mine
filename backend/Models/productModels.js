const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name"],
    trim:true
  },
  description: {
    type: String,
    required: [true, "Please Enter Product description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Product Price"],
    maxLength:[8,"Price Cannot exceed 8 figure"]
  },
  rating:{
    type:Number,
    default:0,
  },
  images:[
    {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
      }
  ],
  category:{
    type:String,
    required:[true,"Please Enter Product Category"]
  },
  Stock:{
    type:Number,
    required:[true,"Please enter Product Stock"],
    maxLength:[4,"Stocks cannot be more than 4 characters"]
  },
  numOfReviews:{
    type:Number,
    default:0,
  },
  reviews:[
    {
      user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
      },
        name:{
            type:String,
            required:true,
        },
        rating:{
            type:Number,
            required:true,
        },
        comment:{
            type:String,
            required:true,
        },
        date:{
          type:Date,
          default:Date.now
        }
    }
  ],
  user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
})

module.exports=mongoose.model("Product",productSchema)
