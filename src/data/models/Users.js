const { Model, DataTypes } = require("sequelize");

class Users extends Model {
  static init(conn) {
    super.init(
      {
        name: DataTypes.STRING(45),
        username: DataTypes.STRING(45),
        email: DataTypes.STRING(45),
        password: DataTypes.STRING(1024),
        cellPhoneNumber: DataTypes.INTEGER(11),
        DDD: DataTypes.INTEGER(3),
        status: DataTypes.STRING(45),
        isAdmin: DataTypes.BOOLEAN,
        photos: DataTypes.STRING(),
      },
      {
        sequelize: conn,
        underscored: false,
        tableName: "users",
      }
    );
  }
  static associate(models) {
    this.hasMany(models.UserFriends, {
      foreignKey: "id_User",
      as: "idUserFriend",
    });
    this.hasMany(models.UserFriends, {
      foreignKey: "id_Friend",
      as: "idFriendUser",
    });
    this.belongsToMany(models.Space_Localizations, {
      foreignKey: "id_User",
      through: "favorites_places",
      as: "UserOwner",
    });
    this.belongsToMany(models.Users, {
      foreignKey: "id_user",
      through: "users_events",
      as: "UsersOwner",
    });
  }
}

module.exports = Users;
