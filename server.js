const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const socket = require("./src/startup/socket");

const fs = require("fs");
const https = require("https");

const http = require("http");

//  const options ={
//  	cert: fs.readFileSync("./keys/server.crt"),
//  	key: fs.readFileSync("./keys/server.key")
//  };

//
const app = express();

//const server = https.createServer(options,app);
const server = http.createServer(app);

require("./src/startup/loggin.js")();
require("./src/startup/config.js")();
require("./src/data/database/index.js")();

app.use(express.json());
app.use(cors());
socket.Socket(server);
app.use(helmet());

app.use(express.static(path.join(__dirname, "/src/view")));
app.set("views", path.join(__dirname, "/src/view"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

const router = require("./src/index.js");

app.use("/api", router);

app.use("/", (req, res) => {
  res.render("index.html");
});



const PORT = process.env.PORT || 6868; //Usando a porta do ambiente ou a porta 6868
server.listen(PORT, () => console.log(`Api listening on port ${PORT}!`));
