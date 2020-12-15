const UserEvents = require("../data/models/UserEvents");
const conn = require("../data/database/connectionFactory");
const { Op } = require("sequelize");

class HistoryServices {
  static async getHistory(id_user) {
    try {
      const [results, metadata] = await conn.query(
        `SELECT distinct  ev.id,Users.id as AuthorID,Users.username as author, Users.photos, ev.name_event,ev.created_at,ev.finished_at ,space.name as SpaceName,space.address,space.CEP,space.UF,space.description as SpaceDescription,sports.name as SportsName,sports.description as SportsDescription from events as ev INNER JOIN space_localizations as space on space.id = ev.id_space INNER JOIN sports as sports on sports.id = ev.id_sport INNER JOIN users_events as UsEv on UsEv.id_events = ev.id INNER JOIN users as Users on Users.id = UsEv.id_user where ev.status = false and UsEv.historyStatus and (UsEv.id_user = ${id_user} or UsEv.id_participants = ${id_user});`
      );
      return results;
    } catch (err) {
      return err;
    }
  }
  static async getHistoryIndex(id_event) {
    try {
      const [results, metadata] = await conn.query(
        `SELECT  ev.id,Users.id as AuthorID,Users.username as author, Users.photos, ev.name_event,ev.created_at,ev.finished_at ,space.name as SpaceName,space.address,space.CEP,space.UF,space.description as SpaceDescription,sports.name as SportsName,sports.description as SportsDescription from events as ev INNER JOIN space_localizations as space on space.id = ev.id_space INNER JOIN sports as sports on sports.id = ev.id_sport INNER JOIN users_events as UsEv on UsEv.id_events = ev.id INNER JOIN users as Users on Users.id = UsEv.id_user where ev.id = ${id_event} and ev.status = false and UsEv.historyStatus;`
      );

      return results;
    } catch (err) {
      return err;
    }
  }
  static async deleteHistoryIndex(id_user, id_events) {
    try {
      const search = await UserEvents.findOne({
        where: {
          id_events,
          [Op.or]: [{ id_user }, { id_participants: id_user }],
        },
      });
      if (search) {
        const update = await UserEvents.update(
          { historyStatus: false },
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
}

module.exports = HistoryServices;
