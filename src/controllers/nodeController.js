import TimeNodeModel from "../models/timeNode.js";
import RoomModel from "../models/eventroom.js";
import { nodeValidator } from "../validations/timeNodeValidation.js";

export const saveTimeNode = async (req, res) => {
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
      header: value.header,
      description: value.description,
      state: value.state,
      startHour: value.startHour,
      finishHour: value.finishHour,
      roomId: value.roomId,
    });

    //add image id to room's images list
    await RoomModel.findById(roomId).then((document) => {
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

export const deleteNode = async (req, res) => {
  try {
    const { nodeId } = req.body;

    //delete image id from user
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

export const updatedNode = async (req, res) => {
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
        finishHour: value.finishHour,
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
