const { Model, DataTypes } = require("sequelize");

class UserEvents extends Model {
  static init(conn) {
    super.init(
      {
        id_user: DataTypes.INTEGER,
        id_participants: DataTypes.INTEGER,
        id_events: DataTypes.INTEGER,
        historyStatus: DataTypes.BOOLEAN,
      },
      {
        sequelize: conn,
        tableName: "users_events",
        underscored: false,
      }
    );
  }
}

module.exports = UserEvents;
