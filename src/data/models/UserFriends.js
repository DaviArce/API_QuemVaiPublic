const { Model, DataTypes, QueryTypes } = require("sequelize");

class UserFriends extends Model {
  static init(conn) {
    super.init(
      {
        status_friendships: DataTypes.STRING(25),
        securityFriend: DataTypes.STRING(25),
      },
      {
        sequelize: conn,
        tableName: "users_friends",
        underscored: false,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: "id_User", as: "UserOwner" });
    this.belongsTo(models.Users, {
      foreignKey: "id_Friend",
      as: "UserFriendOwner",
    });
  }
}

module.exports = UserFriends;
