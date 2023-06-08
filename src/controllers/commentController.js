import CommentModel from "../models/comment.js";
import RoomModel from "../models/eventroom.js";
import { commentValidator } from "../validations/commentValidation.js";

export const uploadComment = async (req, res) => {
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
      author: req.session.user.userId,
    });

    //add image id to room's images list
    await RoomModel.findById(roomId).then((document) => {
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

export const deleteComment = async (req, res) => {
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

export const updateComment = async (req, res) => {
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
