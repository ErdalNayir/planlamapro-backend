import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author: {
      type: String,
      required: true,
    },
    date: { type: Date, default: Date.now },
  },
  { collection: "comments" }
);

const CommentModel = mongoose.model("Comment", CommentSchema);

export default CommentModel;
