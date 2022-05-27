const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    profilePic: {
      type: String,
      default: "",
    },
    shopTitle: {
      type: String,
      required: false,
    },
    shopDesc: {
      type: String,
      required: false,
    },
    coverPhoto: {
      type: String,
      required: false,
    },
    telephone: {
      type: Number,
      required: false,
    },
    provider: {
      type: String,
      default: "email"
    },
    provider_id: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
