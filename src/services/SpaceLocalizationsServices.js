const SpaceLocalization = require("../data/models/Space_Localizations.js");

class SpaceLocalizationServices {
  static async getAll() {
    try {
      const get = SpaceLocalization.findAll({
        where: {
          isStatus: true,
        },
      });
      return get;
    } catch (err) {
      return err;
    }
  }
  static async getById(pk) {
    try {
      const get = SpaceLocalization.findOne({
        where: {
          id: pk,
          isStatus: true,
        },
      });
      return get;
    } catch (err) {
      return err;
    }
  }
  static async getSpace(lat, long) {
    try {
      const find = await SpaceLocalization.findOne({
        where: {
          isStatus: true,
          latitude: lat,
          longitude: long,
        },
      });
      return find;
    } catch (err) {
      return err;
    }
  }
  static async createSpace(
    name,
    address,
    CEP,
    latitude,
    longitude,
    description,
    UF
  ) {
    try {
      const create = await SpaceLocalization.create({
        name: name,
        address: address,
        CEP: CEP,
        latitude: latitude,
        longitude: longitude,
        description: description,
        status: false,
        isStatus: true,
        UF,
      });
      return create;
    } catch (err) {
      return err;
    }
  }
  static async getSpaceSportsById(pk) {
    try {
      const get = await SpaceLocalization.findOne({
        where: {
          isStatus: true,
          id: pk,
        },
        include: {
          association: "space",
          through: {
            attributes: [],
          },
        },
      });
      return get;
    } catch (err) {
      return err;
    }
  }
  static async getAllSpaceSports() {
    try {
      const get = await SpaceLocalization.findAll({
        where: {
          isStatus: true,
        },
        include: {
          association: "space",
          through: {
            attributes: [],
          },
        },
      });
      return get;
    } catch (err) {
      return err;
    }
  }
  static async updateSpaces(name, desc, id_space) {
    try {
      const update = await SpaceLocalization.update(
        { name: name, description: desc },
        { where: { id: id_space } }
      );
      return update;
    } catch (err) {
      return err;
    }
  }
  static async deleteSpace(id_space) {
    try {
      const exclusion = await SpaceLocalization.update(
        { isStatus: false },
        { where: { id: id_space } }
      );
      return exclusion;
    } catch (err) {
      return err;
    }
  }
  static async getPlacesByPkFavorites(pk) {
    try {
      const search = await SpaceLocalization.findByPk(pk, {
        include: {
          association: "space",
          attributes: ["id", "name", "description"],
        },
      });
      return search;
    } catch (err) {
      return err;
    }
  }
  static async getSpecial(valor) {
    try {
      const search = await SpaceLocalization.findByPk(valor, {
        attributes: ["id", "name", "address", "CEP", "description"],
        include: {
          association: "space",
          attributes: ["id", "name", "description"],
        },
      });
      return search;
    } catch (err) {
      return err;
    }
  }
  static async updateStatus(status, id) {
    try {
      const update = await SpaceLocalization.update(
        { status: status },
        { where: { id: id } }
      );
      return update;
    } catch (err) {
      return err;
    }
  }
}

module.exports = SpaceLocalizationServices;
