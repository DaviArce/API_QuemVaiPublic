const SpaceServices = require("../../services/SpaceLocalizationsServices.js");
const EventsServices = require("../../services/EventsServices.js");
const UserEventServices = require("../../services/UserEventServices");



class EventsAdminController {
  static async finishEvent(req, res, next) {
    const { id_space } = req.params;

    try {
      const find = await EventsServices.getEventsBySpaceId(id_space);
  
      if (!find) {
        return res.status(204).send({ "Event found": null });
      }
      const status = false;
      const id_user = find.dataValues.id_author;

      const ending = await UserEventServices.updateHistoric(
        find.dataValues.id_author,
        find.dataValues.id
      );

      const finish = await EventsServices.finishEvent(
        id_user,
        status,
        id_space
      );

      const update = await SpaceServices.updateStatus(status, id_space);
      return res.send({ "Event finished": true });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EventsAdminController;
