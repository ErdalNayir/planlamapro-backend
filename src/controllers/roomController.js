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

export const getRoomByOwner = async (req, res) => {
  try {
    const { creatorId } = req.body;

    await RoomModel.find({ creatorId: creatorId }).then((data) => {
      res.status(200).json(data);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

export const getRoomById = async (req, res) => {
  try {
    const { roomId } = req.body;

    await RoomModel.findById(roomId)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.body;

    //delte room id from user
    const result = await UserModel.updateMany(
      {},
      { $pull: { ownedRooms: roomId, invitedRooms: roomId } }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ message: "Oda veya özellik bulunamadı." });
    }

    //delete room
    await RoomModel.deleteOne({ _id: roomId })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

export const updateRoom = async (req, res) => {
  try {
    const { error, value } = roomValidator.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    await RoomModel.updateOne(
      { _id: value.roomId },
      {
        roomName: value.roomName,
        startDate: value.startDate,
        description: value.description,
      }
    )
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};
