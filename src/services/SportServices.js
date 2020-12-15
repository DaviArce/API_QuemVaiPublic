const Sports = require("../data/models/Sports.js");

class SportsServices {
  static async getAll() {
    try {
      const get = Sports.findAll();
      return get;
    } catch (err) {
      return err;
    }
  }
  static async getByName(name) {
    try {
      const find = Sports.findAll({ where: { name: name } });
      return find;
    } catch (err) {
      return err;
    }
  }
  static async getFindById(pk) {
    try {
      const get = Sports.findByPk(pk);
      return get;
    } catch (err) {
      return err;
    }
  }
  static async createSport(name, description) {
    try {
      const create = await Sports.create({
        name: name,
        description: description,
      });
      return create;
    } catch (err) {
      return err;
    }
  }
  static async updateSport(id, name, description) {
    try {
      const update = await Sports.update(
        { name: name, description: description },
        { where: { id: id } }
      );
      return update;
    } catch (err) {
      return err;
    }
  }
}

module.exports = SportsServices;
