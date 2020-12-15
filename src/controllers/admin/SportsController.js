const SportServices = require("../../services/SportServices");
const SpaceLocalizationsServices = require("../../services/SpaceLocalizationsServices.js");
const SportLocalizationsService = require("../../services/SportsLocalizationsServices");

class SportsController {
  static async addSport(req, res, next) {
    const { id_space, id_sport } = req.params;
    try {
      const spaceFind = await SpaceLocalizationsServices.getById(id_space);
      if (!spaceFind) {
        return res.status(400).send("Space not found");
      }
      const sportFind = await SportServices.getFindById(id_sport);
      if (!sportFind) {
        return res.status(400).send("Sport not found");
      }
      const add = await SportLocalizationsService.createRelation(
        id_sport,
        id_space
      );

      if (add._options.raw === true) {
        return res.status(400).send("This sport already exist in this court");
      }
      return res.json({ Add: add });
    } catch (err) {
      next(err);
    }
  }
  static async getSports(req, res, next) {
    try {
      const result = await SportServices.getAll();
      return res.json(result);
    } catch (err) {
      next(err);
    }
  }
  static async deleteSports(req, res, next) {
    const { id_sport, id_space } = req.params;
    try {
      const find = await SportLocalizationsService.findSportsInSpace(
        id_sport,
        id_space
      );

      if (!find) {
        return res.status(400).send("Not found");
      }
      const erase = await find.destroy();

      return res.json({ Deleted: erase });
    } catch (err) {
      next(err);
    }
  }
  static async index(req, res, next) {
    const { id_sport } = req.params;
    try {
      const find = await SportServices.getFindById(id_sport);
      if (!find) {
        return res.status(204).send("Sport not found");
      }
      return res.json({ created: find });
    } catch (err) {
      next(err);
    }
  }
  static async add(req, res, next) {
    const { name, description } = req.body;
    try {
      const search = await SportServices.getByName(name);
      if (search == "") {
        const find = await SportServices.createSport(name,description);
        return res.json({ Create: true });
      }
      return res.status(400).send({"This sport already exist":true});
      
    } catch (err) {
      next(err);
    }
  }
  static async updateSport(req, res, next) {
    const { id_sport } = req.params;
    const { name, description } = req.body;
    try {
      const find = await SportServices.getFindById(id_sport);
      if (!find) {
        return res.status(204).send("Sport not found");
      }
      const update = await SportServices.updateSport(
        id_sport,
        name,
        description
      );
      return res.send({ "Sport updated": true });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SportsController;
