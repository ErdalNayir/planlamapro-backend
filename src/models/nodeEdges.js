import mongoose from "mongoose";

const EdgeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    animated: { type: Boolean, required: true },
    source: { type: String, required: true },
    sourceHandle: { type: String, required: true },
    style: { type: Object, required: false, default: { stroke: "black" } },
    target: { type: String, required: true },
    targetHandle: { type: String, required: true },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
  },
  { collection: "nodeEdges" }
);

const EdgeModel = mongoose.model("NodeEdge", EdgeSchema);

export default EdgeModel;
