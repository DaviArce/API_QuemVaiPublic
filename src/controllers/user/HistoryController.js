const HistoryServices = require("../../services/HistoryServices");
const support = require("../../utils/SupportFunctions.js");

class HistoryController {
  static async getHistoric(req, res, next) {
    const id = req.user.id;
    try {
      const get = await HistoryServices.getHistory(id);
      if (!get) {
        return res.status(204).send({ "History find": null });
      }
      return res.json(get);
    } catch (err) {
      next(err);
    }
  }
  static async getHistoricIndex(req, res, next) {
    const { id_events } = req.params;
    try {
      const get = await HistoryServices.getHistoryIndex(id_events);
      const valor = support.isEmpty(get);
      if (valor == false) {
        return res.status(204).send({ "Events found": null });
      }
      return res.json(get);
    } catch (err) {
      next(err);
    }
  }
  static async deleteHistoric(req, res, next) {
    const id_user = req.user.id;
    const { id_events } = req.params;
    try {
      const get = await HistoryServices.getHistoryIndex(id_events);
      const valor = support.isEmpty(get);
      if (valor == false) {
        return res.status(204).send({ "Events found": null });
      }
      const update = await HistoryServices.deleteHistoryIndex(
        id_user,
        id_events
      );
      return res.json(update);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = HistoryController;
