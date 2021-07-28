const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");

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
      const date = moment([]);
      const finish = moment().add(config.expireTime,"seconds");

      let token = jwt.sign(
        {result},
        config.jwtPrivateKey,
        { expiresIn: config.expireTime }
      );
      let res = {
        "token":token,
        "expiresIn":`${config.expireTime}s`,
        "loginHour": date,
        "expiresDate":finish
      }
      return res;
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
