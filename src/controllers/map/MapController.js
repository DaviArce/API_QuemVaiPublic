const MapServices = require("../../services/MapServices");
const support = require("../../utils/SupportFunctions");

class MapController {
  static async getMap(req, res, next) {
    const { lat, long } = req.params;
    try {
      const get = await MapServices.getMap(lat, long);
      if (!get) {
        return res.status(204).send({ "Fatal error": true });
      }
      return res.json(get);
    } catch (err) {
      next(err);
    }
  }
  static async getEventCreate(req, res, next) {
    const { lat, long } = req.params;
    try {
      const get = await MapServices.getEvents(lat, long);
      if (!get) {
        return res.status(204).send({ "Fatal error": true });
      }
      return res.json(get);
    } catch (err) {
      next(err);
    }
  }
  static async getSpaceCreate(req, res, next) {
    const { lat, long } = req.params;
    try {
      const get = await MapServices.getSpace(lat, long);
      if (!get) {
        return res.status(204).send({ "Fatal error": true });
      }
      return res.json(get);
    } catch (err) {
      next(err);
    }
  }
  static async getEventsBySpace(req, res, next) {
    const { id_space } = req.params;
    try {
      const result = await MapServices.getSpaceByEvents(id_space);
      const valor = support.isEmpty(result);
      if (valor == false) {
        return res.status(204).send({ "Events found": null });
      }
      return res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MapController;
