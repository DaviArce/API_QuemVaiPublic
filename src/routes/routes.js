const express = require("express");
const routes = express.Router();

const Contact = require("../controllers/TokenFreeController/ContactController.js");

routes.post("/email", Contact.sendMessage);

module.exports = routes;
