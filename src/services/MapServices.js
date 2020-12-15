const SpaceLocalization = require("../data/models/Space_Localizations.js");
const Calculator = require("../utils/DistanceCalculate");
const conn = require("../data/database/connectionFactory");

class MapServices {
  static async getMap(latUser, longUser) {
    try {
      const space = await SpaceLocalization.findAll({
        attributes: [
          "id",
          "name",
          "address",
          "CEP",
          "UF",
          "description",
          "status",
          "latitude",
          "longitude",
        ],
        where: { isStatus: true },
      });
      const size = space.length;
      const nemSpace = [];
      for (let i = 0; i < size; i++) {
        const d = Calculator.haversine(
          latUser,
          longUser,
          space[i].dataValues.latitude,
          space[i].dataValues.longitude
        );
        if (d <= 2) {
          let newSpace = {
            id: space[i].dataValues.id,
            name: space[i].dataValues.name,
            address: space[i].dataValues.address,
            CEP: space[i].dataValues.CEP,
            UF: space[i].dataValues.UF,
            description: space[i].dataValues.description,
            latitude: space[i].dataValues.latitude,
            longitude: space[i].dataValues.longitude,
            status: space[i].dataValues.status,
          };
          nemSpace.push(newSpace);
        }
      }

      return nemSpace;
    } catch (err) {
      return err;
    }
  }
  static async getEvents(latUser, longUser) {
    try {
      const space = await SpaceLocalization.findAll({
        attributes: [
          "id",
          "name",
          "address",
          "CEP",
          "UF",
          "description",
          "status",
          "latitude",
          "longitude",
        ],
        where: { isStatus: true, status: true },
      });
      const size = space.length;
      const nemSpace = [];
      for (let i = 0; i < size; i++) {
        const d = Calculator.Haversine(
          latUser,
          longUser,
          space[i].dataValues.latitude,
          space[i].dataValues.longitude
        );
        if (d <= 2) {
          let newSpace = {
            id: space[i].dataValues.id,
            name: space[i].dataValues.name,
            address: space[i].dataValues.address,
            CEP: space[i].dataValues.CEP,
            UF: space[i].dataValues.UF,
            description: space[i].dataValues.description,
            latitude: space[i].dataValues.latitude,
            longitude: space[i].dataValues.longitude,
            status: space[i].dataValues.status,
          };
          nemSpace.push(newSpace);
        }
      }

      return nemSpace;
    } catch (err) {
      return err;
    }
  }
  static async getSpace(latUser, longUser) {
    try {
      const space = await SpaceLocalization.findAll({
        attributes: [
          "id",
          "name",
          "address",
          "CEP",
          "UF",
          "description",
          "status",
          "latitude",
          "longitude",
        ],
        where: { isStatus: true, status: false },
      });
      const size = space.length;
      const nemSpace = [];
      for (let i = 0; i < size; i++) {
        const d = Calculator.Haversine(
          latUser,
          longUser,
          space[i].dataValues.latitude,
          space[i].dataValues.longitude
        );
        if (d <= 2) {
          let newSpace = {
            id: space[i].dataValues.id,
            name: space[i].dataValues.name,
            address: space[i].dataValues.address,
            CEP: space[i].dataValues.CEP,
            UF: space[i].dataValues.UF,
            description: space[i].dataValues.description,
            latitude: space[i].dataValues.latitude,
            longitude: space[i].dataValues.longitude,
            status: space[i].dataValues.status,
          };
          nemSpace.push(newSpace);
        }
      }

      return nemSpace;
    } catch (err) {
      return err;
    }
  }
  static async getSpaceByEvents(id_space) {
    try {
      const [results, metadata] = await conn.query(
        `SELECT  Users.id as AuthorID,Users.name as author,UsEv.id_participants, Users.photos, ev.name_event,ev.created_at ,space.name as SpaceName,space.address,space.CEP,space.UF,space.description as SpaceDescription,sports.name as SportsName,sports.description as SportsDescription from events as ev INNER JOIN space_localizations as space on space.id = ev.id_space INNER JOIN sports as sports on sports.id = ev.id_sport INNER JOIN users_events as UsEv on UsEv.id_events = ev.id INNER JOIN users as Users on Users.id = UsEv.id_user where ev.id_space = ${id_space} and space.isStatus = true and space.status = true and ev.status= true;`
      );
      return results;
    } catch (err) {
      return err;
    }
  }
}

module.exports = MapServices;
