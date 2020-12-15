const { Model, DataTypes } = require("sequelize");

class Sports_Localizations extends Model {
  static init(conn) {
    super.init(
      {
        id_sports: DataTypes.INTEGER,
        id_space: DataTypes.INTEGER,
      },
      {
        sequelize: conn,
        tableName: "sports_localizations",
        underscored: false,
      }
    );
  }
}
module.exports = Sports_Localizations;
