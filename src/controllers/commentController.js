const CommentModel = require("../models/comment.js");
const RoomModel = require("../models/eventroom.js");
const { commentValidator } = require("../validations/commentValidation.js");

const uploadComment = async (req, res) => {
  //catches server errors
  try {
    // do some validation
    const { error, value } = commentValidator.validate(req.body);

    //if there is a error
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // create room model
    const commentModel = await CommentModel.create({
      content: value.content,
      author: value.author,
    });

    //add image id to room's images list
    await RoomModel.findById(value.roomId).then((document) => {
      document.comments.push(commentModel._id.toString());
      document.save();
    });

    // return room as response
    res.status(200).json({ commentModel });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.body;

    //delete image id from user
    const result = await RoomModel.updateMany(
      {},
      { $pull: { comments: commentId } }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ message: "Oda veya özellik bulunamadı." });
    }

    //delete image
    await CommentModel.deleteOne({ _id: imgId })
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

const updateComment = async (req, res) => {
  try {
    const { error, value } = commentValidator.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    await CommentModel.updateOne(
      { _id: value.commentId },
      {
        content: value.content,
        date: Date.now(),
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

const getRoomComment = async (req, res) => {
  try {
    const { roomId } = req.body;

    const room = await RoomModel.findById(roomId)
      .populate("comments") // invitedRooms referansını doldurmak için populate kullanın
      .exec();

    // Eğer kullanıcı belgesi bulunduysa, invitedRooms özelliğine erişebilirsiniz
    const comments = room.comments;
    return res.status(200).json(comments);
    // invitedRooms'u kullanarak gerekli işlemleri gerçekleştirin
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

module.exports = {
  updateComment,
  uploadComment,
  deleteComment,
  getRoomComment,
};
