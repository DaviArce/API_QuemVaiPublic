const express = require("express");
const routes = express.Router();

const ControllerUser = require("../../controllers/user/UserController.js");
const UnlockController = require("../../controllers/user/UnlockControllers.js");
const Auth = require("../../controllers/TokenFreeController/Auth.js");

routes.post("/signin/user", Auth.login);
routes.post("/signup/user", ControllerUser.signup);
routes.post("/unlockpass", UnlockController.unlockPassword);

module.exports = routes;
