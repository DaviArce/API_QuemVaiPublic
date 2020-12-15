const UserEventsServices = require("../../services/UserEventServices.js");

class EnterEventsController {
  static async enterEvents(req, res, next) {
    const id_user = req.user.id;
    const { id_events } = req.params;
    try {
      const create = await UserEventsServices.enterEvents(id_events, id_user);
      if (!create) {
        return res.status(204).send({ "Event not found": false });
      }
      return res.send({ "Enter in a event": true });
    } catch (err) {
      next(err);
    }
  }
  static async getOutEvents(req, res, next) {
    // n usar, vai tirar o registro das pessoas do banco
    const id_user = req.user.id;
    const { id_events } = req.params;
    try {
      const erase = await UserEventsServices.getOut(id_events, id_user);
      return res.send({ "You quit the event": true });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EnterEventsController;
