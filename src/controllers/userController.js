const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.js");
const { jwtKey } = require("../../config.js");
const {
  signupSchema,
  updateUserSchema,
} = require("../validations/userValidation.js");

// Kayıt olma
const signup = async (req, res) => {
  try {
    const { error, value } = signupSchema.validate(req.body);

    //eğer validasyonda hata oluştuysa
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    // Eğer kullanıcı varsa hata response ediliyor
    const user = await UserModel.findOne({ username: value.username });
    if (user) {
      return res.status(400).json({ message: "Bu kullanıcı zaten var" });
    }

    // eğer password ve confirmPassword aynı değilse hata response ediliyor
    if (value.password !== value.confirmPassword) {
      return res.status(400).json({ message: "Şifreler uyuşmuyor" });
    }

    // Password hash ile şifreleniyor
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(value.password, salt);

    // Yeni kullanıcı oluşturuluyor
    const newUser = new UserModel({
      name: value.name,
      surname: value.surname,
      username: value.username,
      gender: value.gender,
      password: hashedPassword,
    });
    await newUser.save();

    //generate session
    req.session.userId = newUser._id.toString();
    // JWT Token oluşturuluyor
    const token = jwt.sign(
      { username: value.username, id: newUser._id },
      jwtKey,
      {
        expiresIn: "3h",
      }
    );

    //Token ve yeni kullanıcı response olarak döndürülüyor
    res.json({ newUser, token, newUser });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

// Giriş yapma
const login = async (req, res) => {
  const { username, password } = req.body; // gelen isteğin body'sinden email ve şifre bilgilerini alıyoruz

  UserModel.findOne({ username }) // email adresine göre kullanıcıyı bulmak için veritabanı sorgusu yapıyoruz
    .then((user) => {
      if (!user) {
        // kullanıcı bulunamadıysa hata mesajı döndürüyoruz
        return res.status(404).json({ message: "Kullanıcı bulunamadı" });
      }

      // kullanıcının girdiği şifreyi bcrypt kütüphanesiyle karşılaştırıyoruz
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          // eğer bir hata varsa hata mesajı döndürüyoruz
          return res
            .status(401)
            .json({ message: "Kimlik doğrulama başarısız oldu" });
        }

        if (result) {
          // şifreler eşleşiyorsa jwt token oluşturup döndürüyoruz
          const token = jwt.sign({ username, id: user._id }, jwtKey, {
            expiresIn: "3h",
          });

          //generate session
          req.session.userId = user._id.toString();

          return res
            .status(200)
            .json({ message: "Giriş başarılı", token, result, user });
        }

        // şifreler eşleşmiyorsa hata mesajı döndürüyoruz
        res.status(401).json({ message: "Şifre veya Kullanıcı adı yalnış" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

const updateUser = async (req, res) => {
  try {
    const { error, value } = updateUserSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    await UserModel.updateOne(
      { _id: value.userId },
      {
        name: value.name,
        surname: value.surname,
        age: value.age,
        username: value.username,
        gender: value.gender,
        password: value.password,
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

const cikisYap = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Oturumu sonlandırırken bir hata oluştu:", err);
    } else {
      // Oturum başarıyla sonlandırıldı, kullanıcıyı yönlendirin veya mesaj gönderin
      res.send("Çıkış yapıldı");
    }
  });
};

module.exports = { signup, login, updateUser, cikisYap };
