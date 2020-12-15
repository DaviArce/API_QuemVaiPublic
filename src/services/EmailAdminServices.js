const EmailAdmin = require("../data/models/Email_Admin");

class EmailAdminServices {
  static async emailCreate(email_user, id_message, subject, message, status) {
    try {
      const create = await EmailAdmin.create({
        email_user,
        id_message,
        subject,
        message,
        status,
      });
      return create;
    } catch (err) {
      return err;
    }
  }
  static async getById(pk) {
    try {
      const get = await EmailAdmin.findOne({where:{id_message:pk}});
      return get;
    } catch (err) {
      return err;
    }
  }
  static async update(id, status) {
    try {
      const update = EmailAdmin.update(
        { status: status },
        { where: { id: id } }
      );
      return update;
    } catch (err) {
      return err;
    }
  }
}

module.exports = EmailAdminServices;
