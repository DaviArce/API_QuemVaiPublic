const EmailServices = require("../../services/EmailServices");
const EmailAdminServices = require("../../services/EmailAdminServices");
const Postman = require("../../utils/Postman");
const config = require("../../config/emailVariables.json");

class EmailsController {
  static async getEmails(req, res, next) {
    try {
      const get = await EmailServices.getAllEmails();
      if (!get) {
        res.status(204).send({ "Email found": null });
      }
      return res.json(get);
    } catch (err) {
      next(err);
    }
  }

  static async indexEmail(req, res, next) {
    const { id_email } = req.params;
    try {
      const find = await EmailServices.getById(id_email);

      if (!find) {
        return res.status(204).send({ "Email found": null });
      }
      if (
        find.dataValues.status === "responded" ||
        find.dataValues.status === "deleted"
      ) {
        return res.status(422).send({ "Email found": false });
      }
      const status = "viewed";
      const update = EmailServices.updateEmails(id_email, status);

      return res.json(find);
    } catch (err) {
      next(err);
    }
  }

  static async responseEmail(req, res, next) {
    const { id_email } = req.params;
    const { subject, msg } = req.body;

    try {
      const find = await EmailServices.getById(id_email);

      if (!find) {
        return res.status(204).send({ "Email not found": null });
      }
      const user_email = find.dataValues.email_user;

      const transporter = Postman.createTransporter(
        config.mail.mailSender.host,
        config.mail.mailSender.user,
        config.mail.mailSender.password
      );

      const response = await Postman.sendMessage(
        transporter,
        config.mail.mailSender.user,
        user_email,
        msg,
        subject
      );

      if (response.code === "EENVELOPE") {
        return res.status(422).send({ "Email not sended": true });
      }
      const status = "responded";
      const update = await EmailServices.updateEmails(id_email, status);

      const save = await EmailAdminServices.emailCreate(
        config.mail.mailSender.user,
        id_email,
        subject,
        msg,
        status
      );

      if (!update && !save) {
        return res
          .status(500)
          .send({ "Unexpected internal error in server": err });
      }
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  static async getRespondedEmail(req, res, next) {
    try {
      const get = await EmailServices.getRespondedEmails();

      if (!get) {
        return res.status(204).send({ "Email found": null });
      }
      return res.json(get);
    } catch (err) {
      return res
        .status(500)
        .send({ "Unexpected internal error in server": err });
    }
  }
  static async getRespondedEmailById(req, res) {
    const { id_email } = req.params;
    try {
      const get = await EmailServices.getRespondedEmailsById(id_email);

      if (!get) {
        return res.status(204).send({ "Email found": null });
      }
      return res.json(get);
    } catch (err) {
      next(err);
    }
  }

  static async deleteResponse(req, res, next) {
    const { id_email } = req.params;
    try {
      const find = await EmailAdminServices.getById(id_email);
      if (!find) {
        return res.status(204).send({ "Email found": null });
      }
      if (find.dataValues.status !== "responded") {
        return res.status(406).send({ "Not found": false });
      }
      const status = "deleted";
      const erase = await EmailAdminServices.update(id_email, status);
      const erase1 = await EmailServices.updateEmails(
        find.dataValues.id_message,
        status
      );

      return res.json({ Deleted: true });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EmailsController;
