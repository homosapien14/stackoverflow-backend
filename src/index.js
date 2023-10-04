const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { PORT } = require("./config/serverConfig");
const mongoose = require("./config/db");
const cors = require("cors");
const router = require("./routes");

const startServer = () => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  // dbConnect().catch(console.dir);

  app.use("/api", router);
  app.listen(PORT, () => {
    console.log("server is up at ", PORT);
  });
};

startServer();
