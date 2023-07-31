const RoomModel = require("../models/eventroom.js");
const ImageModel = require("../models/image.js");

const uploadImage = async (req, res) => {
  //catches server errors
  const { roomId } = req.body;
  try {
    if (!req.file) {
      // Yükleme hatası - dosya bulunamadı
      return res
        .status(400)
        .json({ message: "Yüklenen bir resim dosyası bulunamadı." });
    }

    const { filename, mimetype, path } = req.file;

    // Mongoose kullanarak resim bilgilerini kaydedin
    const imgModel = await ImageModel.create({
      destination: path,
      filename: filename,
      mimeType: mimetype,
    });

    const id = roomId;
    console.log(roomId);

    //add image id to room's images list
    await RoomModel.findById(roomId).then((document) => {
      document.images.push(imgModel._id.toString());
      document.save();
    });

    // Resim başarıyla kaydedildiyse, istemciye başarılı yanıtı döndürün
    res.json({
      message: "Resim başarıyla yüklendi",
      filename: req.file,
    });
  } catch (error) {
    // Hata durumunda istemciye hata yanıtı döndürün
    res
      .status(500)
      .json({ message: "Resim yükleme hatası", error: error.message });
  }
};

const deleteImage = async (req, res) => {
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

module.exports = { uploadImage, deleteImage };
