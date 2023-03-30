import morgan from "morgan";
import { createWriteStream } from "fs";
import path from "path";

// const accessLogStream = createWriteStream(path.join(__dirname, "access.log"), {
//   flags: "a",
// });

var directoryPath = process.cwd();
var directoryPath = directoryPath + "\\src\\logs\\";

const accessLogStream = createWriteStream(
  path.join(directoryPath, "access.log"),
  { flags: "a" }
);

export const logger = morgan("combined", { stream: accessLogStream });
