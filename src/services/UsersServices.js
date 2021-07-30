const Users = require("../data/models/Users.js");
const conn = require("../data/database/connectionFactory");
class UserServices {
  static async getAllUsers() {
    try {
      const find = await Users.findAll({
        attributes: ["id", "name", "username", "email", "photos", "isAdmin"],
        where: { status: "cadastrado" },
      });
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
      const [results, metadata] = await conn.query(
        `SELECT id,username,name,email,cellPhoneNumber,DDD,status,isAdmin,photos,password FROM quemvai.USERS WHERE email = "${email}" and status = "cadastrado"; `
      );
      return results;
    } catch (err) {
      return err;
    }
  }
  static async getUsersByIndex(index) {
    try {
      const [results, metadata] = await conn.query(
        `SELECT id,username,name,email,cellPhoneNumber,DDD,status,isAdmin,photos,password FROM quemvai.USERS WHERE id = "${index}" ; `
      );
      return results;
    } catch (err) {
      return err;
    }
  }
  static async deleteUser(id, email) {
    try {
      const [results, metadata] = await conn.query(
        `UPDATE quemvai.users SET status = "deleted" WHERE ID = ${id} AND email = "${email}" `
      );
      return results;
    } catch (err) {
      return err;
    }
  }
  static async updateUser(cell, DDD, name, nick, email, ResultArray) {
    if (cell == "") {
      cell = ResultArray.dataValues.cellPhoneNumber;
    } else {
    }
    if (DDD == "") {
      DDD = ResultArray.dataValues.DDD;
    } else {
    }
    if (name == "") {
      name = ResultArray.dataValues.name;
    } else {
    }
    if (nick == "") {
      nick = ResultArray.dataValues.username;
    } else {
    }

    const [results, metadata] = await conn.query(
      `UPDATE quemvai.users SET cellPhoneNumber = '${cell}', DDD = '${DDD}', name = '${name}', username = '${nick}'  WHERE  email = "${email}" `
    );
    return results;
  }
  static async updatePassword(id,email,newPassword){
    const [results, metadata] = await conn.query(
      `UPDATE quemvai.users SET password = '${newPassword}' WHERE  email = "${email}" AND id = '${id}';`
    );
    return results;
  }
  static async updateEmail(id,email,newEmail){
    const [results, metadata] = await conn.query(
      `UPDATE quemvai.users SET email = '${newEmail}' WHERE  email = "${email}" AND id = '${id}';`
    );
    return results;
  }
  static async createUser(cell, DDD, name, nick, pass, email, photo) {
    try {
      const [results, metadata] = await conn.query(
        `INSERT INTO quemvai.USERS (username,name,email,password,cellPhoneNumber,DDD,status,isAdmin,photos) VALUES ('${nick}', '${name}','${email}','${pass}','${cell}','${DDD}','cadastrado','0','${photo}'); `
      );
      return results;
    } catch (err) {
      return err;
    }
  }
}

module.exports = UserServices;
