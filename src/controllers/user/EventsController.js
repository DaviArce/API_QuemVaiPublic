const SpaceServices = require("../../services/SpaceLocalizationsServices.js");
const EventsServices = require("../../services/EventsServices.js");
const UserEventServices = require("../../services/UserEventServices");

const SportsLocalizationServices = require("../../services/SportsLocalizationsServices");

class EventsController {
  static async getEvents(req, res, next) {
    try {
      const find = await EventsServices.getAllEvents();

      if (!find) {
        return res.status(204).send({ "Events found": null });
      }
      return res.json(find);
    } catch (err) {
      next(err);
    }
  }
  static async index(req, res, next) {
    const { id_events } = req.params;
    try {
      const find = await EventsServices.getEventsById(id_events);
      if (!find) {
        return res.status(204).send({ "Event found": null });
      }
      return res.json(find);
    } catch (err) {
      next(err);
    }
  }
  static async createEvents(req, res, next) {
    const id_user = req.user.id;
    const { name_Event, id_space, id_sport } = req.body;

    try {
      const space = await SpaceServices.getById(id_space);
      if (!space) {
        return res.status(204).send({ "Space found": null });
      }

      const sports = await SportsLocalizationServices.findSportsInSpace(
        id_sport,
        id_space
      );

      if (!sports) {
        return res.status(204).send({ "Sport found on this court": null });
      }

      if (space.dataValues.status === true) {
        return res.status(406).send({ "Court in use": true });
      }

      const find = await EventsServices.getEventsByAuthor(id_user);

      if (
        !find ||
        find.dataValues.status === null ||
        find.dataValues.status === "" ||
        find.dataValues.status === false
      ) {
        const time = await EventsServices.createEvents(
          id_user,
          id_space,
          id_sport,
          name_Event
        );
        const create = await UserEventServices.createRelation(
          id_user,
          time.dataValues.id
        );

        const status = true;
        const update = await SpaceServices.updateStatus(status, id_space);

        return res.send({ "Event created": true });
      }

      return res.status(406).send({ "You have events active": true });
    } catch (err) {
      next(err);
    }
  }
  static async updateEvent(req, res, next) {
    const id_user = req.user.id;
    const { name_event, id_sport, id_space } = req.body;
    try {
      const status = true;
      const find = await EventsServices.getEventsByAuthorStatus(
        id_user,
        status,
        id_space
      );

      if (!find) {
        return res.status(204).send({ "Event found": null });
      }
      const sports = await SportsLocalizationServices.findSportsInSpace(
        id_sport,
        id_space
      );

      if (!sports) {
        return res.status(204).send({ "Sport found on this court": null });
      }

      const update = await EventsServices.updateEvent(
        name_event,
        id_sport,
        id_user
      );
      return res.send({ "Update completed": true });
    } catch (err) {
      next(err);
    }
  }
  static async finishEvent(req, res, next) {
    const id_user = req.user.id;
    const { id_space } = req.params;

    try {
      const find = await EventsServices.getEventsByAuthorStatus(
        id_user,
        true,
        id_space
      );

      if (!find) {
        return res.status(204).send({ "Event found": null });
      }
      const status = false;

      const ending = await UserEventServices.updateHistoric(
        id_user,
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
  static async getParticipants(req,res,next){
    const {id_events} = req.params;
    try{
      const find = await EventsServices.getUniqueEvent(id_events);
      if(!find){
        return res.status(400).send({"event not found":true});
      }
      const get = await EventsServices.getParticipant(id_events);
      if(!get){
        return res.status(204).send({"found":null});
      }
      return res.send(get);
    }
    catch(err){
      next(err);
    }
  }
  static async cancelEvent(req, res, next) {
    const id_user = req.user.id;
    const { id_space } = req.params;
    try {
      const find = await EventsServices.getEventsByAuthorStatus(id_user, true);
      if (!find) {
        return res.status(204).send({ "Event found": null });
      }

      const cancel = await EventsServices.cancelEvent(null, id_user);

      const status = false;
      const update = await SpaceServices.updateStatus(status, id_space);
      return res.send({ "Event canceled": true });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EventsController;
