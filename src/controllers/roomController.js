const { roomValidator } = require("../validations/roomValidation.js");
const RoomModel = require("../models/eventroom.js");
const UserModel = require("../models/user.js");

const createRoom = async (req, res) => {
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
      creatorId: value.creatorId,
    });

    //add room id to user's owned room
    await UserModel.findById(value.creatorId).then((document) => {
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

const getRoomByOwner = async (req, res) => {
  try {
    const { creatorId } = req.body;

    await RoomModel.find({ creatorId: creatorId }).then((data) => {
      return res.status(200).json(data);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getInvitedRooms = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await UserModel.findById(userId)
      .populate("invitedRooms") // invitedRooms referansını doldurmak için populate kullanın
      .exec();

    // Eğer kullanıcı belgesi bulunduysa, invitedRooms özelliğine erişebilirsiniz
    const invitedRooms = user.invitedRooms;
    return res.status(200).json(invitedRooms);
    // invitedRooms'u kullanarak gerekli işlemleri gerçekleştirin
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getRoomById = async (req, res) => {
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

const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.body;

    //delete room id from user
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

const updateRoom = async (req, res) => {
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

const addUserToRoom = async (req, res) => {
  try {
    const { roomId, username } = req.body;

    await UserModel.findOne({ username: username }).then((doc) => {
      if (doc.invitedRooms.includes(roomId)) {
        res.status(400).send({ message: "Bu odaya zaten kayıtlı" });
      } else {
        doc.invitedRooms.push(roomId);
        RoomModel.findById(roomId).then((document) => {
          document.members.push(doc._id);
          document.save();
        });
        doc.save();
      }
    });

    await res.status(200).send({ message: "İşlem başarılı" });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

module.exports = {
  createRoom,
  getRoomByOwner,
  getRoomById,
  deleteRoom,
  updateRoom,
  getInvitedRooms,
  addUserToRoom,
};
