const Events = require("../data/models/Events.js");
const conn = require("../data/database/connectionFactory");
const moment = require("moment");

class EventsServices {
  static async getUniqueEvent(id){
    try{
      const [results, metadata] = await conn.query(
        `SELECT * FROM events WHERE id = ${id} and status = true;`
      );

      return results[0];
      
    }
    catch(err){
      return err;
    }
  }
  static async getAllEvents() {
    try {
      const [results, metadata] = await conn.query(
        `SELECT ev.id as Id_Event,space.id as id_space, Users.id as AuthorID,Users.username as author, Users.photos, ev.name_event,ev.created_at,space.name as SpaceName,space.address,space.CEP,space.UF,space.description as SpaceDescription,sports.name as SportsName,sports.description as SportsDescription from events as ev INNER JOIN space_localizations as space on space.id = ev.id_space INNER JOIN sports as sports on sports.id = ev.id_sport INNER JOIN users_events as UsEv on UsEv.id_events = ev.id INNER JOIN users as Users on Users.id = UsEv.id_user where ev.status = true;`
      );
      return results;
    } catch (err) {
      return err;
    }
  }
  static async getEventsBySpaceId(pk){
    const find = await Events.findOne({
      where: {
        status:true,
        id_space:pk,
      },
    });
    return find;
  }
  static async getEventsById(pk) {
    try {
      const [results, metadata] = await conn.query(
        `SELECT distinct ev.id as Id_Event,space.id as id_space, Users.id as AuthorID,Users.username as author,Users.photos,ev.name_event,ev.created_at ,space.name as SpaceName,space.address,space.CEP,space.UF,space.description as SpaceDescription,sports.name as SportsName,sports.description as SportsDescription from events as ev INNER JOIN space_localizations as space on space.id = ev.id_space INNER JOIN sports as sports on sports.id = ev.id_sport INNER JOIN users_events as UsEv on UsEv.id_events = ev.id INNER JOIN users as Users on Users.id = UsEv.id_user  where ev.id = ${pk} and space.isStatus = true and space.status = true and ev.status= true;`
      );
      return results;
    } catch (err) {
      return err;
    }
  }
  static async getEventsByAuthor(id) {
    try {
      const get = await Events.findOne({
        where: { id_author: id, status: true },
      });
      return get;
    } catch (err) {
      return err;
    }
  }
  static async createEvents(id_author, id_space, id_sport, name_event) {
    try {
      const date = moment().locale("ptBR").format("DD-MM-YYYY HH:mm:ss");
      const created_at = moment([]);
      const finish = moment().add(5, "hours");
      const time = await Events.create({
        id_space: id_space,
        id_author,
        id_sport,
        name_event,
        event_date: date,
        status: true,
        created_at: created_at,
        finished_at: finish,
      });
      return time;
    } catch (err) {
      return err;
    }
  }
  static async getEventsByAuthorStatus(id_author, status, id_space) {
    try {
      const find = await Events.findOne({
        where: {
          id_author,
          status,
          id_space,
        },
      });
      return find;
    } catch (err) {
      return err;
    }
  }
  static async updateEvent(name_event, id_sport, id_author) {
    try {
      const updated_at = moment([]);
      const update = await Events.update(
        { name_event, id_sport, updated_at: updated_at },
        { where: { id_author, status: true } }
      );
      return update;
    } catch (err) {
      return err;
    }
  }
  static async getParticipant(id_event){
    try{
      let result = [];
      const roleAuthor = await conn.query(`select distinct us.id, us.username as creator, us.photos as photos from events as event inner join users_events as users_events on event.id = users_events.id_events inner join users as us on  us.id = users_events.id_user where event.id = ${id_event} and us.status = "cadastrado" and event.status = true;`);
      const roleParticipant = await conn.query(`select distinct us.id, us.username as participants, us.photos as photos from events as event inner join users_events as users_events on event.id = users_events.id_events inner join users as us on  us.id = users_events.id_participants  where event.id = ${id_event} and us.status = "cadastrado" and event.status = true;`);
      result.push({"author":roleAuthor[0],"participant":roleParticipant[0]});
      return result;
    }
    catch(err){
      return err;
    }
  }
  static async finishEvent(id_author, status, id_place) {
    try {
      const updated_at = moment([]);
      const finished_at = moment([]);
      const finish = await Events.update(
        { updated_at: updated_at, finished_at: finished_at, status },
        { where: { id_author, status: true, id_space: id_place } }
      );
      return finish;
    } catch (err) {
      return err;
    }
  }
  static async cancelEvent(status, id_author) {
    try {
      const finished_at = moment([]);
      const cancel = await Events.update(
        { finished_at: finished_at, status },
        { where: { id_author, status: true } }
      );
      return cancel;
    } catch (err) {
      return err;
    }
  }
}
module.exports = EventsServices;
