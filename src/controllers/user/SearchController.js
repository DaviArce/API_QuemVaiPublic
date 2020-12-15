const SearchServices = require("../../services/SearchServices");
const SpaceLocalizationServices = require("../../services/SpaceLocalizationsServices");
const SportsServices = require("../../services/SportServices");
const support = require("../../utils/SupportFunctions");
class Search {
  // search bar
  static async finder(req, res, next) {
    const idOwn = req.user.id;
    const { word } = req.body;
    try {
      const get = await SearchServices.find(word, idOwn);
      if (!get) {
        return res.status(204).send({ "Look that we found": null });
      }
      return res.json(get);
    } catch (err) {
      next(err);
    }
  }
  static async sportsFinder(req, res, next) {
    const { id_sports } = req.params;
    try {
      const status = await SearchServices.getSport(id_sports);
      const valor = support.isEmpty(status);
      if (valor == false) {
        return res.status(204).send({ "Sports Find": null });
      }

      return res.json(status);
    } catch (err) {
      next(err);
    }
  }
  static async spaceFinder(req, res, next) {
    const { id_space } = req.params;
    try {
      const get = await SpaceLocalizationServices.getSpaceSportsById(id_space);
      if (!get) {
        return res.status(204).send({ "Spaces find": null });
      }
      if (get.dataValues.status == true) {
        return res.json({ "This courts already have a event": get });
      }
      return res.json(get);
    } catch (err) {
      next(err);
    }
  }
  static async userFinder(req, res, next) {
    const idOwn = req.user.id;
    const { id_user } = req.params;
    try {
      if (idOwn == id_user) {
        return res.status(422).send({ "Equals id's": true });
      }
      const get = await SearchServices.getUsers(id_user);

      const valor = support.isEmpty(get);
      if (valor == false) {
        return res.status(204).send({ "Person find": null });
      }
      return res.json(get);
    } catch (err) {
      next(err);
    }
  }
  static async eventsFinder(req, res, next) {
    const { id_event } = req.params;
    try {
      const get = await SearchServices.getEvents(id_event);
      const valor = support.isEmpty(get);
      if (valor == false) {
        return res.status(204).send({ "Events find": null });
      }
      return res.json(get);
    } catch (err) {
      next(err);
    }
  }
  /**
   * Navigation bat search
   */
  static async eventFinderByUF(req, res, next) {
    const { UF } = req.params;
    try {
      const get = await SearchServices.getEventsByUF(UF);
      if (!get) {
        return res.status(204).send({ "Events find": null });
      }
      return res.json(get);
    } catch (err) {
      next(err);
    }
  }
  static async sportsFinderByUF(req, res, next) {
    const { UF } = req.params;
    try {
      const find = await SearchServices.getSportByUF(UF);
      if (!find) {
        return res.status(204).send({ "Events find": null });
      }
      return res.json(find);
    } catch (err) {
      next(err);
    }
  }
  static async spacesFinderByUF(req, res, next) {
    const { UF } = req.params;
    try {
      const get = await SearchServices.getSpaceByUF(UF);
      if (!get) {
        return res.status(204).send({ "Spaces find": null });
      }

      return res.json(get);
    } catch (err) {
      next(err);
    }
  }
  static async getAllSports(req, res, next) {
    try {
      const get = await SportsServices.getAll();
      return res.json(get);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = Search;
