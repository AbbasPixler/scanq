const mongoose = require("mongoose");

const ProductCategorySchema = new mongoose.Schema(
  {
    username: {
      type:String,
      required:true,
    },
    name: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product_Category", ProductCategorySchema);