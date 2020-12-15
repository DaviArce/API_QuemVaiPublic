const guid = require("guid");
const config = require("../../config/emailVariables.json");

const UserServices = require("../../services/UsersServices.js");
const Crypt = require("../../utils/Crypt");
const Postman = require("../../utils/Postman");

class UnlockController {
  static async unlockPassword(req, res, next) {
    const { email } = req.body;
    try {
      const result = await UserServices.getUsersByEmail(email);

      if (!result) {
        return res.status(204).send({ "User Found": null });
      }
      const newPassword = guid.raw().toString();

      const hash = await Crypt.generateHash(newPassword);

      const update = await result.update({ password: hash });

      const msg = `Sua senha foi redefinida para:\n ${newPassword}`;

      const subject =
        "Sua nova senha foi gerada <Por favor não responda este email>";

      const transporter = Postman.createTransporter(
        config.mail.mailSender.host,
        config.mail.mailSender.user,
        config.mail.mailSender.password
      );

      const send = await Postman.sendMessage(
        transporter,
        config.mail.mailSender.user,
        email,
        msg,
        subject
      );

      return res.send({ "Password updated": true });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UnlockController;
