const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { databaseConnection } = require("./config.js");
const userRoutes = require("./src/routes/userRoutes.js");
const roomRoutes = require("./src/routes/roomRoutes.js");
const imageRoutes = require("./src/routes/imageRoutes.js");
const edgeRoutes = require("./src/routes/edgeRoutes.js");
const commentRoutes = require("./src/routes/commentRoutes.js");
const nodeRoutes = require("./src/routes/nodeRoutes.js");
const { logger } = require("./src/logs/logger.js");
const session = require("express-session");
const { sessionKey } = require("./config.js");

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
    cookie: {
      maxAge: 36000000,
      httpOnly: false, // <- set httpOnly to false
    },
  })
);

//ROUTES
app.use("/user", userRoutes);
app.use("/room", roomRoutes);
app.use("/images", imageRoutes);
app.use("/comment", commentRoutes);
app.use("/node", nodeRoutes);
app.use("/edges", edgeRoutes);

//MONGODB CONNECTIO
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

module.exports = app;
