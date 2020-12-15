const { DataTypes, Model } = require("sequelize");

class Email_Admin extends Model {
  static init(conn) {
    super.init(
      {
        email_user: DataTypes.STRING,
        subject: DataTypes.STRING,
        message: DataTypes.STRING,
        status: DataTypes.STRING(30),
      },
      {
        sequelize: conn,
        timestamps: true,
        tableName: "email_admin",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Email, {
      foreignKey: "id_message",
      as: "receiverMessage",
    });
  }
}

module.exports = Email_Admin;
