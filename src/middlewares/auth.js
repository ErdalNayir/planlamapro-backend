import jwt from "jsonwebtoken";
import { jwtKey } from "../../config";

// JWT kimlik doğrulama middleware'i
export const authMiddleware = async (req, res, next) => {
  // İstek headerdan token alınıyor
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    // Token yoksa, erişim reddediliyor
    return res.status(401).json({ message: "Token bulunamadı" });
  }

  try {
    // Token doğrulama aşaması
    const decodedToken = jwt.verify(token, jwtKey);
    req.user = decodedToken;
    next();
  } catch (err) {
    // Token doğrulanamazsa, erişim reddediliyor
    return res
      .status(401)
      .json({ message: "Token doğrulaması başarısız oldu" });
  }
};
