const Postman = require("../../utils/Postman");
const EmailServices = require("../../services/EmailServices");
const config = require("../../config/emailVariables.json");

class ContactController {
  static async sendMessage(req, res, next) {
    const { destinatario, assunto, msg } = req.body;
    if (!destinatario) {
      return res.status(204).send({ "Recipient not sent": true });
    }
    const newMsg = `From: ${destinatario}\n${msg}`;
    try {
      const transporter = Postman.createTransporter(
        config.mail.mailSender.host,
        config.mail.mailSender.user,
        config.mail.mailSender.password
      );

      const resMsg =
        "recebemos seu email, responderemos você o mais breve possível e agradecemos o seu feedback";
      const resSubj = "recebemos seu email <Não responda este email>";

      const send1 = await Postman.sendMessage(
        transporter,
        config.mail.mailSender.user,
        destinatario,
        resMsg,
        resSubj
      );

      if (send1.code === "EENVELOPE") {
        return res.status(400).send("could not send your email");
      }

      const send2 = await Postman.sendMessage(
        transporter,
        config.mail.mailSender.user,
        config.mail.mailGetter.user,
        newMsg,
        assunto
      );

      const status = "new";

      const save = await EmailServices.createEmail(
        destinatario,
        assunto,
        msg,
        status
      );

      return res.json({ "Message sended": true });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ContactController;
