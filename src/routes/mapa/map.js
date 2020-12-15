const express = require("express");
const routes = express.Router();

const MapController = require("../../controllers/map/MapController.js");

routes.get("/get/:lat/:long", MapController.getMap);
routes.get("/get/events/:lat/:long", MapController.getEventCreate);
routes.get("/get/spaces/:lat/:long", MapController.getSpaceCreate);
routes.get("/find/events/:id_space", MapController.getEventsBySpace);

module.exports = routes;
