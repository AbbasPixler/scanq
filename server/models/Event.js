const mongoose = require("mongoose");
var id = mongoose.Types.ObjectId();

const EventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    eventDesc: {
      type: String,
      required: true,
    },
    eventImage: {
      type: String,
      required: false,
    },
    
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema)
module.exports = Event;
