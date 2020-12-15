const Users = require("../data/models/Users.js");

class UserServices {
  static async getAllUsers() {
    try {
      const find = await Users.findAll({ attributes:["id","name","username","email","photos","isAdmin"],where: { status: "cadastrado" } });
      return find;
    } catch (err) {
      return err;
    }
  }
  static async getUsersByPk(pk) {
    try {
      const find = await Users.findOne({
        where: { id: pk, status: "cadastrado" },
      });

      return find;
    } catch (err) {
      return err;
    }
  }
  static async getUsersOn(pk) {
    try {
      const find = await Users.findOne({
        attributes: ["id", "username", "photos"],
        where: { id: pk, status: "cadastrado" },
      });
      return find;
    } catch (err) {
      return err;
    }
  }
  static async getUsersByEmail(email) {
    try {
      const find = await Users.findOne({
        where: { email: email, status: "cadastrado" },
      });
      return find;
    } catch (err) {
      return err;
    }
  }
  static async createUser(cell, DDD, name, nick, pass, email, photo) {
    try {
      const create = await Users.create({
        cellPhoneNumber: cell,
        email: email,
        DDD: DDD,
        name: name,
        password: pass,
        username: nick,
        status: "cadastrado",
        isAdmin: false,
        photos: photo,
      });

      return create;
    } catch (err) {
      return err;
    }
  }
}

module.exports = UserServices;
