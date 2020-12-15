const conn = require("../data/database/connectionFactory");
const FavoritesPlaces = require("../data/models/Favorites_Places");

class FavoritesPlaceService {
  static async index(user, place) {
    try {
      const search = await FavoritesPlaces.findAll({
        where: { idUser: user, idPlace: place },
      });
      return search;
    } catch (err) {
      return err;
    }
  }
  static async create(user, place) {
    try {
      const create = await FavoritesPlaces.create({
        idUser: user,
        idPlace: place,
      });
      return create;
    } catch (err) {
      return err;
    }
  }
  static async getFavorites(user) {
    try {
      const search = await conn.query(
        `SELECT Space.id as Space_id,Space.name as nome,Space.address as address,Space.CEP as CEP,Space.UF as UF,Space.latitude as latitude,Space.longitude,Space.description,Space.status,Space.isStatus from space_localizations as Space INNER JOIN favorites_places as Favorites on Favorites.id_Place = Space.id INNER JOIN  users as Us on Favorites.id_User = Us.id where Space.isStatus = true and Favorites.id_User = ${user}; `
      );
      return search[0];
    } catch (err) {
      return err;
    }
  }
  static async verifyFriends(user) {
    try {
      const find = await FavoritesPlaces.findAll({ where: { id_User: user } });
      return find;
    } catch (err) {
      return err;
    }
  }
  static async removeFavorites(user, place) {
    try {
      const erase = await FavoritesPlaces.destroy({
        where: { idUser: user, idPlace: place },
      });
      return erase;
    } catch (err) {
      return err;
    }
  }
  static async getAllPlacesLessFavorites(id_user) {
    let superQuery = "";
    try {
      const [results, metadata] = await conn.query(
        `select id_place from favorites_places where id_user = ${id_user};`
      );

      let size = results.length;
      let query = `select distinct spaces.id, spaces.name, spaces.address, spaces.CEP,spaces.UF,spaces.latitude, spaces.longitude,spaces.description,spaces.status ,spaces.isStatus from space_localizations as spaces inner join favorites_places as favorites on favorites.id_Place = spaces.id where isStatus= true and spaces.id != ${id_user};`;

      if (size <= 1) {
        superQuery = query + ";";
        const [search, metadata2] = await conn.query(superQuery);
        return search;
      }
      for (let i = 0; i <= size - 1; i++) {
        if (i == size - 1) {
          superQuery = query + ` and spaces.id != ${results[i].id_place};`;
        } else {
          superQuery = query + ` and spaces.id != ${results[i].id_place}`;
        }
      }
      const [search, metadata2] = await conn.query(superQuery);
      return search;
    } catch (err) {
      return err;
    }
  }
}

module.exports = FavoritesPlaceService;
