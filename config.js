const dotenv = require("dotenv");
dotenv.config();

const databaseConnection = {
  password: process.env.MONGODB_PASSWORD,
  dbName: process.env.MONGODB_DBNAME,
};

const jwtKey = process.env.JWT_SECRET_KEY;

const sessionKey = process.env.SESSION_KEY;

const expiryDate = 120 * 60 * 1000; // 120 minutes in milliseconds

module.exports = { databaseConnection, jwtKey, sessionKey, expiryDate };
