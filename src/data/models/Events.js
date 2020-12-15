const { Model, DataTypes } = require("sequelize");

class Events extends Model {
  static init(conn) {
    super.init(
      {
        id_space: DataTypes.INTEGER,
        id_author: DataTypes.INTEGER,
        id_sport: DataTypes.INTEGER,

        name_event: DataTypes.STRING(50),
        event_date: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
        created_at: DataTypes.DATE,
        finished_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize: conn,
        underscored: false,
        tableName: "events",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Space_Localizations, {
      foreignKey: "id_space",
      as: "EventsOwnerSpaces",
    });
    this.belongsToMany(models.Users, {
      foreignKey: "id_events",
      through: "users_events",
      as: "EventsOwner",
    });
  }
}

module.exports = Events;
