const mongoose = require("mongoose");

const QrcodeSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    codeText: {
      type: String,
      default: "Eat Out"
    },
    fgColor: {
      type: String,
      default: "black"
    },
    bgColor: {
      type: String,
      default: "white"
    },
    padding: {
      type: Number,
    },
    borderRadius: {
      type: Number,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Qr", QrcodeSchema);
