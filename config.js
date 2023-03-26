import dotenv from "dotenv";

dotenv.config();

export const databaseConnection = {
  password: process.env.MONGODB_PASSWORD,
  dbName: process.env.MONGODB_DBNAME,
};
