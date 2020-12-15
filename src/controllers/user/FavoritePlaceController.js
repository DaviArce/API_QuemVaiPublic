const FavoritesPlacesServices = require("../../services/FavoritesPlaceServices");
const SpaceLocalizationsServices = require("../../services/SpaceLocalizationsServices");
const support = require("../../utils/SupportFunctions");

class FavoritePlaceController {
  static async addFavoritesPlaces(req, res, next) {
    const { id_place } = req.params;
    const id_user = req.user.id;
    try {
      const find = await SpaceLocalizationsServices.getById(id_place);

      if (!find) {
        return res.status(204).send({ "Space found": null });
      }
      const search = await FavoritesPlacesServices.index(id_user, id_place);

      if (search[0]) {
        return res.status(204).send({ "Space already registered": true });
      }
      const create = await FavoritesPlacesServices.create(id_user, id_place);

      return res.send({ "Favorite Place added": true });
    } catch (err) {
      next(err);
    }
  }
  static async findAllSpaces(req, res, next) {
    const id_user = req.user.id;
    try {
      const all = await FavoritesPlacesServices.getAllPlacesLessFavorites(
        id_user
      );

      if (!all) {
        return res.status(204).send({ "Spaces found": null });
      }

      return res.json(all);
    } catch (err) {
      next(err);
    }
  }
  static async getFavorites(req, res, next) {
    const id_user = req.user.id;
    try {
      const send = await FavoritesPlacesServices.getFavorites(id_user);
      const valor = support.isEmpty(send);
      if (valor == false) {
        return res.status(204).send({ "Space found": null });
      }

      return res.json(send);
    } catch (err) {
      next(err);
    }
  }
  static async removeFavorites(req, res, next) {
    const { id_place } = req.params;
    const id_user = req.user.id;
    try {
      const find = await FavoritesPlacesServices.index(id_user, id_place);
      const valor = support.isEmpty(find);
      if (valor == false) {
        return res.status(204).send({ "Space found": null });
      }

      const erase = await FavoritesPlacesServices.removeFavorites(
        id_user,
        id_place
      );
      return res.json({ "Removed favorites": true });
    } catch (err) {
      return res
        .status(500)
        .send({ "Unexpected internal error in server": err });
    }
  }
  static async indexFavorites(req, res, next) {
    const { id_place } = req.params;
    const id_user = req.user.id;
    try {
      const find = await FavoritesPlacesServices.index(id_user, id_place);

      const valor = support.isEmpty(find);
      if (valor == false) {
        return res.status(204).send({ "Places found": null });
      }
      const search = await SpaceLocalizationsServices.getPlacesByPkFavorites(
        id_place
      );

      return res.json(search);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = FavoritePlaceController;
