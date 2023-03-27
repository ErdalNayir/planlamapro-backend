import dotenv from "dotenv";

dotenv.config();

export const databaseConnection = {
  password: process.env.MONGODB_PASSWORD,
  dbName: process.env.MONGODB_DBNAME,
};

export const jwtKey = process.env.JWT_SECRET_KEY;
