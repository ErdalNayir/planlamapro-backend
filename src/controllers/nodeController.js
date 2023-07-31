const TimeNodeModel = require("../models/timeNode.js");
const RoomModel = require("../models/eventroom.js");
const { nodeValidator } = require("../validations/timeNodeValidation.js");

const saveTimeNode = async (req, res) => {
  //catches server errors
  try {
    // do some validation
    const { error, value } = nodeValidator.validate(req.body);

    //if there is a error
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // create room model
    const nodeModel = await TimeNodeModel.create({
      id: value.id,
      header: value.header,
      description: value.description,
      state: value.state,
      startHour: value.startHour,
      roomId: value.roomId,
      positionAbsolute: value.positionAbsolute,
    });

    await RoomModel.findById(value.roomId).then((document) => {
      document.nodes.push(nodeModel._id.toString());
      document.save();
    });

    // return room as response
    res.status(200).json({ nodeModel });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const deleteNode = async (req, res) => {
  try {
    const { nodeId } = req.body;

    const result = await RoomModel.updateMany({}, { $pull: { nodes: nodeId } });

    if (result.nModified === 0) {
      return res.status(404).json({ message: "Oda veya özellik bulunamadı." });
    }

    //delete image
    await TimeNodeModel.deleteOne({ _id: nodeId })
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

const updatedNode = async (req, res) => {
  try {
    const { error, value } = nodeValidator.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    await TimeNodeModel.updateOne(
      { _id: value.nodeId },
      {
        header: value.header,
        description: value.description,
        state: value.state,
        startHour: value.startHour,
        roomId: value.roomId,
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

const getRoomNodes = async (req, res) => {
  try {
    const { roomId } = req.body;

    const room = await RoomModel.findById(roomId).populate("nodes").exec();

    // Eğer kullanıcı belgesi bulunduysa, invitedRooms özelliğine erişebilirsiniz
    const nodes = room.nodes;
    return res.status(200).json(nodes);
    // invitedRooms'u kullanarak gerekli işlemleri gerçekleştirin
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const deleteAllNodesFromRoom = async (req, res) => {
  const { roomId } = req.body;

  // Node'ları silme işlemi
  RoomModel.findByIdAndUpdate(roomId, { $set: { nodes: [] } }, { new: true })
    .then((updatedRoom) => {
      if (!updatedRoom) {
        return res.status(404).json({ error: "Oda bulunamadı" });
      }
      res.json({ message: "Node'lar başarıyla silindi" });
    })
    .catch((error) => {
      console.error("Node'ları silme hatası:", error);
      res.status(500).json({ error: "Sunucu hatası" });
    });
};

module.exports = {
  saveTimeNode,
  updatedNode,
  deleteNode,
  deleteAllNodesFromRoom,
  getRoomNodes,
};
