import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { databaseConnection } from "./config.js";
import userRoutes from "./src/routes/userRoutes.js";
import roomRoutes from "./src/routes/roomRoutes.js";
import { logger } from "./src/logs/logger.js";

const app = express();

//plug-ins
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//LOGGER
app.use(logger);

//ROUTES
app.use("/user", userRoutes);
app.use("/room", roomRoutes);

//MONGODB CONNECTION
mongoose.set("strictQuery", true);

mongoose
  .connect(
    `mongodb+srv://admin:${databaseConnection.password}@planlamaprocluster.bylft91.mongodb.net/?retryWrites=true&w=majority`,
    { dbName: databaseConnection.dbName }
  )
  .then(() => {
    app.listen(3000, "localhost", () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => console.log(error.message));
