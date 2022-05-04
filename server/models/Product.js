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
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema)
module.exports = Product;
