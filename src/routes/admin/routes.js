const express = require("express");
const routes = express.Router();

const SpaceController = require("../../controllers/admin/SpacesControllers.js");
const SportsController = require("../../controllers/admin/SportsController.js");
const EmailsController = require("../../controllers/admin/EmailsController.js");
const UsersController = require("../../controllers/admin/UsersControllers");
const EventsAdminController = require("../../controllers/admin/EventsController");

// Spaces
routes.post("/cadastrar", SpaceController.add);
routes.get("/find/space/:id_space", SpaceController.index);
routes.get("/find/all", SpaceController.getAll);
routes.put("/update/:id_space", SpaceController.update);
routes.delete("/find/delete/:id_space", SpaceController.delete);

// Sport
routes.get("/get/sport/cadastrar", SportsController.getSports);
routes.post(
  "/add/sport/:id_sport/to/space/:id_space",
  SportsController.addSport
);
routes.delete(
  "/delete/sport/:id_sport/in/space/:id_space",
  SportsController.deleteSports
);
routes.put("/sport/update/:id_sport", SportsController.updateSport);
routes.post("/sport/cadastrar", SportsController.add);
routes.get("/sport/find/:id_sport", SportsController.index);

// Emails
routes.get("/get/emails", EmailsController.getEmails);
routes.post("/response/email/:id_email", EmailsController.responseEmail);
routes.get("/get/email/find/:id_email", EmailsController.indexEmail);
routes.get("/get/responded/email", EmailsController.getRespondedEmail);
routes.get(
  "/get/responded/email/find/:id_email",
  EmailsController.getRespondedEmailById
);
routes.put("/delete/email/:id_email", EmailsController.deleteResponse);


// Users
routes.get("/get/users", UsersController.getAllUsers);


//Events
routes.put("/finish/events/:id_space",EventsAdminController.finishEvent);

module.exports = routes;
