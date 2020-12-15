const UserEvents = require("../data/models/UserEvents");
const { Op } = require("sequelize");
class UserEventService {
  static async createRelation(id_user, id_event) {
    try {
      const create = await UserEvents.create({
        id_user: id_user,
        id_events: id_event,
      });
      return create;
    } catch (err) {
      return err;
    }
  }
  static async updateHistoric(id_user, id_events) {
    try {
      const search = await UserEvents.findOne({
        where: {
          id_events,
          [Op.or]: [{ id_user }, { id_participants: id_user }],
        },
      });
      if (search) {
        const update = await UserEvents.update(
          { historyStatus: true },
          {
            where: {
              id_events,
              [Op.or]: [{ id_user }, { id_participants: id_user }],
            },
          }
        );
        return update;
      }
      return search;
    } catch (err) {
      return err;
    }
  }
  static async enterEvents(id_events, id_participants) {
    try {
      const result = await UserEvents.findOne({ where: { id_events } });
      if (!result) {
        return result;
      }
      const get = await UserEvents.findOne({
        where: { id_events, id_participants, historyStatus: null },
      });
      if (get) {
        return get;
      }
      const create = await UserEvents.create({
        id_user: result.dataValues.id_user,
        id_events: id_events,
        id_participants: id_participants,
      });
      return create;
    } catch (err) {
      return err;
    }
  }
  static async getOut(id_events, id_participants) {
    try {
      const get = await UserEvents.destroy({
        where: { id_events, id_participants, historyStatus: null },
      });
      if (!get || !get[0]) {
        return get;
      }
      await get.destroy();
      return get;
    } catch (err) {
      return err;
    }
  }
}

module.exports = UserEventService;
