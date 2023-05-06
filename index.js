import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { databaseConnection } from "./config.js";
import userRoutes from "./src/routes/userRoutes.js";
import roomRoutes from "./src/routes/roomRoutes.js";
import imageRoutes from "./src/routes/imageRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js";
import nodeRoutes from "./src/routes/nodeRoutes.js";
import { logger } from "./src/logs/logger.js";
import session from "express-session";
import { sessionKey } from "./config.js";
import { expiryDate } from "./config.js";

const app = express();

//plug-ins
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//LOGGER
app.use(logger);

//add session
app.use(
  session({
    secret: sessionKey,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: expiryDate },
  })
);

//ROUTES
app.use("/user", userRoutes);
app.use("/room", roomRoutes);
app.use("/images", imageRoutes);
app.use("/comment", commentRoutes);
app.use("/node", nodeRoutes);

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
