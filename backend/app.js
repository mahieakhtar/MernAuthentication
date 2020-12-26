const express = require("express");
const cors = require("cors");
const app = express();
const https = require("https");
const path = require("path");
const fs = require("fs");
const seaport = require("seaport");
const ports = seaport.connect("localhost", 9090);

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Added Json Body-parser
app.use(bodyParser.json());

app.use(cors());

//Import Routes
const userRoute = require("./routes/user");
const db = require("./db");
app.use("/user", userRoute);

//Initial route
app.get("/", (req, res) => {
  res.send(
    "Welcome to the banking app" +
      " on port" +
      " : " +
      httpsServer.address().port
  );
});

//finds the private key and certificate
const httpsServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "server.key")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "server.crt")),
  },
  app
);

httpsServer.listen(ports.register("server"), () => {
  db.getConnection().then(() => {
    console.log("Database connected and ready to go!");
  });
  console.log("Server listening on", httpsServer.address().port);
});
