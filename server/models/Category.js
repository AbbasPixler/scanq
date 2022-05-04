const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
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

module.exports = mongoose.model("Category", CategorySchema);
