import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    gender: { type: String, required: true },
    ownedRooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: false,
        default: [],
      },
    ],
    invitedRooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: false,
        default: [],
      },
    ],
  },
  { collection: "users" }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
