const EdgeModel = require("../models/nodeEdges.js");
const RoomModel = require("../models/eventroom.js");

const saveEdge = async (req, res) => {
  //catches server errors
  try {
    // do some validation
    const value = req.body;

    // create room model
    const edgeModel = await EdgeModel.create({
      id: value.id,
      animated: value.animated,
      source: value.source,
      sourceHandle: value.sourceHandle,
      target: value.target,
      targetHandle: value.targetHandle,
      roomId: value.roomId,
    });

    await RoomModel.findById(value.roomId).then((document) => {
      document.edges.push(edgeModel._id.toString());
      document.save();
    });

    // return room as response
    res.status(200).json({ edgeModel });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getRoomEdges = async (req, res) => {
  try {
    const { roomId } = req.body;

    const room = await RoomModel.findById(roomId).populate("edges").exec();

    // Eğer kullanıcı belgesi bulunduysa, invitedRooms özelliğine erişebilirsiniz
    const edges = room.edges;
    return res.status(200).json(edges);
    // invitedRooms'u kullanarak gerekli işlemleri gerçekleştirin
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const deleteAllEdgesFromRoom = async (req, res) => {
  const { roomId } = req.body;

  // Node'ları silme işlemi
  RoomModel.findByIdAndUpdate(roomId, { $set: { edges: [] } }, { new: true })
    .then((updatedRoom) => {
      if (!updatedRoom) {
        return res.status(404).json({ error: "Edge bulunamadı" });
      }
      res.json({ message: "Edge'ler başarıyla silindi" });
    })
    .catch((error) => {
      console.error("Edge'lerı silme hatası:", error);
      res.status(500).json({ error: "Sunucu hatası" });
    });
};

module.exports = { saveEdge, getRoomEdges, deleteAllEdgesFromRoom };
