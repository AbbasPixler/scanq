const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema(
    {
        shopTitle: {
          type: String,
          required: true,
        },
        shopDesc: {
          type: String,
          required: true,
        },
        coverPhoto: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        telephone: {
          type: Number,
          required: false,
        },
        address:{
          type: String,
          required: true
        },
        profilePic: {
          type: String,
          default: "",
        },
        category: {
          type: String,
          required: false,
        },
        facebook:{
          type: String,
          required: false
        },
        instagram:{
          type: String,
          required: false
        },
        twitter:{
          type: String,
          required: false
        },
        youtube:{
          type: String,
          required: false
        },
        qrCode:{
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
        categories:[ String ],
        timings:[
          {
          day: {
          type:String,
          required: false
        },
        shopStatus: {
          type:String,
          default: "Closed",
          required: false
        },
        timeFrom: {
          type:String,
          required: false
        },
        timeTo: {
          type:String,
          required: false
        }
        }]
      },
      { timestamps: true }
    );

module.exports = mongoose.model("Shop", ShopSchema);
