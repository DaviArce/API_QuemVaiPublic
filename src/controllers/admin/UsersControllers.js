const UsersServices = require("../../services/UsersServices");

class UsersControllers {
  static async getAllUsers(req, res, next) {
    try {
      const search = await UsersServices.getAllUsers();
      if (!search) {
        return res.status(204);
      }
      return res.json(search);
    } catch (err) {
      next();
    }
  }
}

module.exports = UsersControllers;
