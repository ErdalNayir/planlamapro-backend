const mongoose = require("mongoose");

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

module.exports = CommentModel;
