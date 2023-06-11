const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const req = require("express/lib/request");
const connectDB = require("./config/dbConn");
const { logEvents } = require("./middleware/logger");
const { default: mongoose } = require("mongoose");

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public")));

app.use(errorHandler);

mongoose.connection.on("connected", () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error: ${err}`);
  logEvents(`${err.no}: ${err.code}`, "mongoErrors.log");
});
