const Events = require("../data/models/Events");
const Sports = require("../data/models/Sports");
const Space = require("../data/models/Space_Localizations");
const Users = require("../data/models/Users");
const conn = require("../data/database/connectionFactory");
const {Op} = require("sequelize");

class SearchServices {
  static async find(word, id) {
    const values = [];
    try {
      const getSports = await Sports.findAll({
        where: {
          name: { [Op.like]: `%${word}%` },
        },
      });
      values.push({ Sports: getSports });
      const getUsers =   await Users.findAll({
        attributes: ["id", "username", "photos"],
        
        include:{
          association:"idFriendUser",
         },
        where: {
          
          username: { [Op.like]: `%${word}%` },
          status: "cadastrado",
          id:{[Op.ne]: id},
        },
        
      });
      values.push({ Users: getUsers });
      const getEvents = await Events.findAll({
        attributes: [
          "id",
          "id_space",
          "id_author",
          "id_sport",
          "name_event",
          "event_date",
          "created_at",
        ],
        include: {
          association: "EventsOwnerSpaces",
        },
        where: {
          status: true,
          name_event: { [Op.like]: `%${word}%` },
        },
      });
      values.push({ Events: getEvents });

      const getSpace = await Space.findAll({
        attributes: ["id", "name", "address", "CEP", "description","status"],
        where: {
          [Op.or]: [
            { isStatus: true, address: { [Op.like]: `%${word}%` } },
            { isStatus: true, name: { [Op.like]: `%${word}%` } },
            { isStatus: true, CEP: { [Op.like]: `%${word}%` } },
          ],
        },
      });
      values.push({ Spaces: getSpace });
      return values;
    } catch (err) {
      return err;
    }
  }
  static async getSport(pk) {
    try {
      const get = await conn.query(
        `Select Sport.id as Sport_id, Sport.name as Name_Sport,Sport.description as Sport_Description, Space.id as Space_id,Space.name as Space_name,Space.address as Space_address,Space.CEP as Space_CEP,Space.UF as Space_UF,Space.description as Space_Description,Space.status as Space_status from sports as Sport INNER JOIN sports_localizations as SportLocal on Sport.id = SportLocal.id_sports INNER JOIN space_localizations as Space on SportLocal.id_space = Space.id where Space.id = ${pk} and Space.isStatus = true and Space.status=false;`
      );
      return get[0];
    } catch (err) {
      return err;
    }
  }
  static async getSportByUF(uf) {
    try {
      const get = await conn.query(
        `Select Sport.id as Sport_id, Sport.name as Name_Sport,Sport.description as Sport_Description, Space.id as Space_id,Space.name as Space_name,Space.address as Space_address,Space.CEP as Space_CEP,Space.UF as Space_UF,Space.description as Space_Description,Space.status as Space_status from sports as Sport INNER JOIN sports_localizations as SportLocal on Sport.id = SportLocal.id_sports INNER JOIN space_localizations as Space on SportLocal.id_space = Space.id where Space.UF = "${uf}" and Space.isStatus = true and Space.status=false; `
      );
      return get[0];
    } catch (err) {
      return err;
    }
  }
  static async getSpace(pk) {
    try {
      const get = await Space.findOne({
        attributes: ["id", "name", "address", "CEP", "description", "status"],
        where: { id: pk, isStatus: true, status: false },
        include: {
          association: "space",
        },
      });
      return get;
    } catch (err) {
      return err;
    }
  }
  static async getSpaceByUF(uf) {
    try {
      const get = await Space.findAll({
        attributes: ["id", "name", "address","latitude","longitude", "CEP", "description", "status"],
        where: { UF: uf, isStatus: true },
        include: {
          association: "space",
        },
      });
      return get;
    } catch (err) {
      return err;
    }
  }
  static async getEvents(pk) {
    try {
      const [results, metadata] = await conn.query(
        `SELECT  ev.id as Id_Event,space.id as id_space ,Users.id as AuthorID,Users.name as author,Users.photos,ev.name_event,ev.created_at ,space.name as SpaceName,space.address,space.CEP,space.UF,space.description as SpaceDescription,sports.name as SportsName,sports.description as SportsDescription from events as ev INNER JOIN space_localizations as space on space.id = ev.id_space INNER JOIN sports as sports on sports.id = ev.id_sport INNER JOIN users_events as UsEv on UsEv.id_events = ev.id INNER JOIN users as Users on Users.id = UsEv.id_user  where ev.id = ${pk} and space.isStatus = true and space.status = true and ev.status= true;`
      );
      return results;
    } catch (err) {
      return err;
    }
  }
  static async getUsers(pk) {
    try {
      const [results, metadata] = await conn.query(
        `SELECT id, username, photos FROM users WHERE id = ${pk};`
      );

      return results;
    } catch (err) {
      return err;
    }
  }
  static async getEventsByUF(uf) {
    try {
      const [results, metadata] = await conn.query(
        `SELECT  ev.id as Id_Event,space.id as id_space ,Users.id as AuthorID,Users.name as author,Users.photos,ev.name_event,ev.created_at ,space.name as SpaceName,space.address,space.CEP,space.UF,space.description as SpaceDescription,sports.name as SportsName,sports.description as SportsDescription from events as ev INNER JOIN space_localizations as space on space.id = ev.id_space INNER JOIN sports as sports on sports.id = ev.id_sport INNER JOIN users_events as UsEv on UsEv.id_events = ev.id INNER JOIN users as Users on Users.id = UsEv.id_user  where space.UF = "${uf}" and space.isStatus = true and space.status = true and ev.status= true;`
      );
      return results[0];
    } catch (err) {
      return err;
    }
  }
}

module.exports = SearchServices;
