const express = require("express");
const routes = express.Router();

const ControllerUserManagement = require("../../controllers/user/UserController");

routes.get("/bring/me", ControllerUserManagement.index);
routes.put("/delete/me", ControllerUserManagement.delete);
routes.put("/update/me", ControllerUserManagement.update);
routes.put("/update/me/photo", ControllerUserManagement.updatePhoto);
routes.put("/unlockpass/me", ControllerUserManagement.updatePassword);
routes.put("/delete/me/photo", ControllerUserManagement.deletePhoto);

module.exports = routes;
