const express = require("express");
const routes = express.Router();

const HistoryController = require("../../controllers/user/HistoryController");

routes.get("/get/all", HistoryController.getHistoric);
routes.get("/get/find/:id_events", HistoryController.getHistoricIndex);
routes.put("/delete/:id_events", HistoryController.deleteHistoric);

module.exports = routes;
