const Email = require("../data/models/Email");
const { Op } = require("sequelize");
class EmailServices {
  static async getAllEmails() {
    try {
      const get = await Email.findAll({
        order: [["created_at", "ASC"]],
        having: {
          [Op.and]: [
            {
              status: {
                [Op.ne]: "deleted",
              },
            },
            {
              status: {
                [Op.ne]: "responded",
              },
            },
          ],
        },
      });
      return get;
    } catch (err) {
      return err;
    }
  }
  static async getById(pk) {
    try {
      const get = await Email.findByPk(pk);
      return get;
    } catch (err) {
      return err;
    }
  }
  static async updateEmails(pk, status) {
    try {
      const update = await Email.update(
        { status: status },
        { where: { id: pk } }
      );
      return update;
    } catch (err) {
      return err;
    }
  }
  static async getRespondedEmails() {
    try {
      const get = await Email.findAll({
        include: {
          association: "ownerMessage",
          attributes: ["email_user", "subject", "message"],
        },
        order: [["created_at", "ASC"]],
        having: {
          status: "responded",
        },
      });
      return get;
    } catch (err) {
      return err;
    }
  }
  static async getRespondedEmailsById(pk) {
    try {
      const get = await Email.findAll({
        include: {
          association: "ownerMessage",
          attributes: ["email_user", "subject", "message"],
        },
        order: [["created_at", "ASC"]],
        having: {
          status: "responded",
          id: pk,
        },
      });
      return get;
    } catch (err) {
      return err;
    }
  }
  static async createEmail(email_user, subject, message, status) {
    try {
      const create = await Email.create({
        email_user,
        subject,
        status,
        message,
      });
      return create;
    } catch (err) {
      return err;
    }
  }
}

module.exports = EmailServices;
