import { roomValidator } from "../validations/roomValidation.js";
import RoomModel from "../models/eventroom.js";
import UserModel from "../models/user.js";

export const createRoom = async (req, res) => {
  //catches server errors
  try {
    // do some validation
    const { error, value } = roomValidator.validate(req.body);

    //if there is a error
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    //find user

    // create room model
    const roomModel = await RoomModel.create({
      roomName: value.roomName,
      startDate: value.startDate,
      description: value.description,
      creatorId: req.session.userId,
    });

    //add room id to user's owned room
    console.log(req.session.userId);
    await UserModel.findById(req.session.userId).then((document) => {
      document.ownedRooms.push(roomModel._id.toString());
      document.save();
    });

    // return room as response
    res.status(200).json({ roomModel });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};
