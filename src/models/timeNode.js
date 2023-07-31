const mongoose = require("mongoose");

const NodeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    header: { type: String, required: true },
    description: {
      type: String,
      required: false,
      default: "",
    },
    positionAbsolute: { type: Object, required: true },
    state: { type: String, required: true },
    startHour: { type: String, required: true },
    // members: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: false,
    //     default: [],
    //   },
    // ],
    // lateMembers: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: false,
    //     default: [],
    //   },
    // ],
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
  },
  { collection: "timeNodes" }
);

const TimeNodeModel = mongoose.model("TimeNode", NodeSchema);

module.exports = TimeNodeModel;
