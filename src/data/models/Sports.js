const { Model, DataTypes } = require("sequelize");

class Sports extends Model {
  static init(conn) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
      },
      {
        sequelize: conn,
      }
    );
  }
  static associate(models) {
    this.belongsToMany(models.Space_Localizations, {
      foreignKey: "id_sports",
      through: "sports_localizations",
      as: "sports",
    });
  }
}

module.exports = Sports;
