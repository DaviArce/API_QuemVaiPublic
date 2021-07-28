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
      const [results,metadata] = await conn.query(`SELECT id,username,name,email,cellPhoneNumber,DDD,status,isAdmin,photos FROM quemvai.USERS WHERE email = "${email}" and status = "cadastrado"; `)
      // const find = await Users.findOne({
      //   where: { email: email, status: "cadastrado" },
      // });
      return results;
      
    } catch (err) {
      return err;
    }
  }
  static async deleteUser(id,email){
    console.log(id,email);
    try{
      const [results, metadata] = await conn.query(
        `UPDATE quemvai.users SET status = "deleted" WHERE ID = ${id} AND email = "${email}" `
      );
      return results;
    }
    catch(err){
      return err;
    }
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
