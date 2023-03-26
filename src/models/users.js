import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    gender: { type: String, required: true },
    ownedRooms: { type: Array, required: false, default: [] },
    invitedRooms: { type: Array, required: false, default: [] },
  },
  { collection: "users" }
);

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
