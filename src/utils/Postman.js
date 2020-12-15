const nodemailer = require("nodemailer");

class Postman {
  static createTransporter(service, user, pass) {
    try {
      const transporter = nodemailer.createTransport({
        service: service,
        auth: {
          user: user,
          pass: pass,
        },
      });
      return transporter;
    } catch (err) {
      return err;
    }
  }
  static async sendMessage(transporter, from, to, msg, subject) {
    try {
      const result = await transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        text: msg,
      });
      return result;
    } catch (err) {
      return err;
    }
  }
}

module.exports = Postman;
