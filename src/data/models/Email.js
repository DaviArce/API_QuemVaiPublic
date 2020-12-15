const { Model, DataTypes } = require("sequelize");

class Email extends Model {
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
        underscored: true,
        tableName: "email",
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Email_Admin, {
      foreignKey: "id_message",
      as: "ownerMessage",
    });
  }
}

module.exports = Email;
