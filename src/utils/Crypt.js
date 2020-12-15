const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require("../config/custom-environment-variables.json");
const UsersService = require("../services/UsersServices.js");

class Crypt {
  static async generateHash(password) {
    try {
      let salt = await bcrypt.genSalt(config.saltValue);
      let hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (err) {
      return err;
    }
  }

  static async generateToken(email) {
    try {
      const result = await UsersService.getUsersByEmail(email);

      let id = result.dataValues.id;
      let isAdmin = result.dataValues.isAdmin;
      let name = result.dataValues.name;

      let token = jwt.sign(
        { id: id, isAdmin: isAdmin, name: name },
        config.jwtPrivateKey,
        { expiresIn: 18000 }
      );

      return token;
    } catch (err) {
      return err;
    }
  }
  static async compareHash(password, compare) {
    try {
      const validPassword = await bcrypt.compare(password, compare);
      return validPassword;
    } catch (err) {
      return err;
    }
  }
}
module.exports = Crypt;
