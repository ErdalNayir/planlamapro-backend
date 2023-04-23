import mongoose from "mongoose";

const NodeSchema = new mongoose.Schema(
  {
    header: { type: String, required: true },
    description: {
      type: String,
      required: false,
      default: "",
    },
    state: { type: String, required: true },
    startHour: { type: Date, required: true },
    finishHour: { type: Date, required: true },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
        default: [],
      },
    ],
    lateMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
        default: [],
      },
    ],
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
  },
  { collection: "timeNodes" }
);

const TimeNodeModel = mongoose.model("TimeNode", NodeSchema);

export default TimeNodeModel;
