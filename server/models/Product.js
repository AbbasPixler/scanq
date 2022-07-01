const mongoose = require("mongoose");
var id = mongoose.Types.ObjectId();

const ProductSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    productDesc: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    strainType:{
      type: String
    },
    productType:{
      type: String
    },
    flavourType:{
      type:String
    },
    effectType:{
      type:String
    },
    CBD:{
      type: String
    },
    THC:{
      type: String
    },
    recommended:{
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema)
module.exports = Product;
