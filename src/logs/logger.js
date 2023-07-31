const morgan = require("morgan");
const { createWriteStream } = require("fs");
const path = require("path");

// const accessLogStream = createWriteStream(path.join(__dirname, "access.log"), {
//   flags: "a",
// });

var directoryPath = process.cwd();
var directoryPath = directoryPath + "//src//logs//";

const accessLogStream = createWriteStream(
  path.join(directoryPath, "access.log"),
  { flags: "a" }
);

const logger = morgan("combined", { stream: accessLogStream });

module.exports = { logger };
