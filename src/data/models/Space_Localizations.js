const { Model, DataTypes } = require("sequelize");

class Space_Localizations extends Model {
  static init(conn) {
    super.init(
      {
        name: DataTypes.STRING(80),
        address: DataTypes.STRING(80),
        CEP: DataTypes.STRING(9),
        UF: DataTypes.STRING(5),
        latitude: DataTypes.DECIMAL(10, 8),
        longitude: DataTypes.DECIMAL(11, 8),
        description: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
        isStatus: DataTypes.BOOLEAN,
      },
      {
        sequelize: conn,
        underscored: false,
        tableName: "space_localizations",
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Events, {
      foreignKey: "id_space",
      as: "SpaceOwnerEvents",
    });
    this.belongsToMany(models.Sports, {
      foreignKey: "id_space",
      through: "sports_localizations",
      as: "space",
    });
    this.belongsToMany(models.Users, {
      foreignKey: "id_place",
      through: "favorites_places",
      as: "PlacesOwner",
    });
  }
}

module.exports = Space_Localizations;
