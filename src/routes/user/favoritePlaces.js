const express = require("express");
const routes = express.Router();

const FavoritesPlaces = require("../../controllers/user/FavoritePlaceController.js");

routes.post("/add/place/:id_place", FavoritesPlaces.addFavoritesPlaces);
routes.get("/get/place", FavoritesPlaces.getFavorites);
routes.delete("/remove/place/:id_place", FavoritesPlaces.removeFavorites);
routes.get("/get/place/:id_place", FavoritesPlaces.indexFavorites);
routes.get("/get/all/places", FavoritesPlaces.findAllSpaces);

module.exports = routes;
