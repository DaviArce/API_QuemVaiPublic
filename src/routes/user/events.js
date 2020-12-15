const express = require("express");
const routes = express.Router();

const EventsController = require("../../controllers/user/EventsController.js");
const EnterEventsController = require("../../controllers/user/EnterEventsController.js");

routes.post("/create", EventsController.createEvents);
routes.get("/get/all", EventsController.getEvents);
routes.get("/get/find/:id_events", EventsController.index);
routes.put("/update", EventsController.updateEvent);
routes.put("/finish/:id_space", EventsController.finishEvent);
routes.put("/cancel/:id_space", EventsController.cancelEvent);

routes.post("/enter/:id_events", EnterEventsController.enterEvents);
routes.get("/participant/:id_events", EventsController.getParticipants);
routes.delete("/quit/:id_events", EnterEventsController.getOutEvents);

module.exports = routes;
