import dotenv from "dotenv";

dotenv.config();

export const databaseConnection = {
  password: process.env.MONGODB_PASSWORD,
  dbName: process.env.MONGODB_DBNAME,
};

export const jwtKey = process.env.JWT_SECRET_KEY;

export const sessionKey = process.env.SESSION_KEY;

export const expiryDate = 120 * 60 * 1000; // 120 minutes in milliseconds
