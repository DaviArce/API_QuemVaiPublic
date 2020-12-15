const { DataTypes, Model } = require("sequelize");

class FavoritesPlaces extends Model {
  static init(conn) {
    super.init(
      {
        idUser: DataTypes.INTEGER,
        idPlace: DataTypes.INTEGER,
      },
      {
        sequelize: conn,
      }
    );
  }
}

module.exports = FavoritesPlaces;
