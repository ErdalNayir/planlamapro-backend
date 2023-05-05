import RoomModel from "../models/eventroom.js";
import ImageModel from "../models/image.js";

export const uploadImage = async (req, res) => {
  //catches server errors
  try {
    // do some validation
    const { imgUrl, roomId } = req.body;

    //find user

    // create room model
    const imgModel = await ImageModel.create({
      imgUrl: imgUrl,
      sender: req.session.userId,
    });

    //add image id to room's images list
    await RoomModel.findById(roomId).then((document) => {
      document.images.push(imgModel._id.toString());
      document.save();
    });

    // return room as response
    res.status(200).json({ imgModel });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { imgId } = req.body;

    //delete image id from user
    const result = await RoomModel.updateMany({}, { $pull: { images: imgId } });

    if (result.nModified === 0) {
      return res.status(404).json({ message: "Oda veya özellik bulunamadı." });
    }

    //delete image
    await ImageModel.deleteOne({ _id: imgId })
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
