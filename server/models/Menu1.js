const mongoose = require("mongoose");

const Menu1Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    }, 
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu1", Menu1Schema);
