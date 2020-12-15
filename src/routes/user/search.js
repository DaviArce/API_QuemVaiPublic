const express = require("express");
const routes = express.Router();

const SearchController = require("../../controllers/user/SearchController");

/**
 * Barra de buscas
 */
routes.post("/main", SearchController.finder);
routes.get("/sport/:id_sports", SearchController.sportsFinder);
routes.get("/user/:id_user", SearchController.userFinder);
routes.get("/space/:id_space", SearchController.spaceFinder);
routes.get("/events/:id_event", SearchController.eventsFinder);

routes.get("/all/sports",SearchController.getAllSports);
/**
 * Navigation
 */
routes.get("/uf/sport/:UF", SearchController.sportsFinderByUF);
routes.get("/uf/space/:UF", SearchController.spacesFinderByUF);
routes.get("/uf/events/:UF", SearchController.eventFinderByUF);

module.exports = routes;
