import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomName: { type: String, required: true },
    startDate: { type: Date, required: true },
    createdAt: { type: Date, required: false, default: Date.now },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    description: { type: String, required: true },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
        default: [],
      },
    ],
  },
  { collection: "eventroom" }
);

const RoomModel = mongoose.model("Room", roomSchema);

export default RoomModel;
