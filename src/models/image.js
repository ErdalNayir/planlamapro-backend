const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    destination: { type: String, required: true },
    filename: { type: String, required: true },
    mimeType: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { collection: "images" }
);

const ImageModel = mongoose.model("Image", ImageSchema);

module.exports = ImageModel;
