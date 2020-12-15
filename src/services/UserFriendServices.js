const UsersFriends = require("../data/models/UserFriends");
const conn = require("../data/database/connectionFactory");
const { Op } = require("sequelize");

class UserFriendsServices {
  static async findFriends(my, friend) {
    try {
      const find = await UsersFriends.findOne({
        where: {
          [Op.or]: [
            { id_Friend: friend, id_User: my },
            { id_Friend: my, id_User: friend },
          ],
        },
      });
      return find;
    } catch (err) {
      return err;
    }
  }

  static async updateFriendShipStatus(my, friend, status) {
    try {
      const update = UsersFriends.update(
        { status_friendships: status },
        { where: { id_User: my, id_Friend: friend } }
      );
      return update;
    } catch (err) {
      return err;
    }
  }
  static async updateSecurityFriend(my, friend, status) {
    try {
      const update = UsersFriends.update(
        { securityFriend: status },
        { where: { id_User: my, id_Friend: friend } }
      );
      return update;
    } catch (err) {
      return err;
    }
  }

  static async createInvite(my, friend) {
    try {
      const create = UsersFriends.create({
        id_User: my,
        id_Friend: friend,
        status_friendships: "invited",
      });
      return create;
    } catch (err) {
      return err;
    }
  }
  static async getSentInvites(my) {
    try {
      const results = await conn.query(`SELECT UserFriends.id, UserFriends.id_User, UserFriends.id_Friend,UserFriends.status_friendships,UserFriends.securityFriend, UserFriendOwner.id, UserFriendOwner.username,UserFriendOwner.photos FROM users_friends AS UserFriends LEFT OUTER JOIN users AS UserFriendOwner ON UserFriends.id_Friend = UserFriendOwner.id WHERE UserFriends.id_User = ${my} AND 
            UserFriends.status_friendships = 'invited';`);
      return results[0];
    } catch (err) {
      return err;
    }
  }
  static async getInvites(my) {
    try {
      const results = await conn.query(`SELECT UserFriends.id, UserFriends.id_User, UserFriends.id_Friend,UserFriends.status_friendships,UserFriends.securityFriend, UserOwner.id, UserOwner.username, UserOwner.photos FROM users_friends AS UserFriends LEFT OUTER JOIN users AS 
                UserOwner ON UserFriends.id_User = UserOwner.id WHERE UserFriends.id_Friend = ${my} AND UserFriends.status_friendships = 'invited';`);
      return results[0];
    } catch (err) {
      return err;
    }
  }
  static async getInvitesAccept(my, friend, status) {
    try {
      const result = await UsersFriends.findOne({
        where: {
          id_Friend: my,
          id_User: friend,
          status_friendships: status,
        },
      });
      return result;
    } catch (err) {
      return err;
    }
  }
  static async updateInviteStatus(my, friend, status, where) {
    try {
      const update = await UsersFriends.update(
        { status_friendships: status },
        {
          where: {
            id_User: friend,
            id_Friend: my,
            status_friendships: where,
          },
        }
      );
      return update;
    } catch (err) {
      return err;
    }
  }
  static async getEmptyFriendship(my, friend) {
    try {
      const search = await UsersFriends.findOne({
        where: { id_User: my, id_Friend: friend, status_friendships: "" },
      });
      return search;
    } catch (err) {
      return err;
    }
  }
  static async createRelationship(my, friend) {
    try {
      const create = await UsersFriends.create({
        id_User: my,
        id_Friend: friend,
        status_friendships: "accepted",
      });
      return create;
    } catch (err) {
      return err;
    }
  }
  static async fillEmptyFriendship(my, friend) {
    try {
      const create = await UsersFriends.update(
        { status_friendships: "accepted" },
        { where: { id_User: my, id_Friend: friend, status_friendships: "" } }
      );
      return create;
    } catch (err) {
      return err;
    }
  }
  static async getFriends(my_id) {
    try {
      const send = [];
      const results = await UsersFriends.findAll({
        where: {
          id_User: my_id,
          status_friendships: "accepted",
        },
        include: {
          where: { status: "cadastrado" },
          association: "UserFriendOwner",
          attributes: [
            "username",
            "name",
            "photos",
            "email",
            "DDD",
            "cellPhoneNumber",
          ],
        },
      });
      const valor = results.length;

      for (var i = 0; i < valor; i++) {
        if (results[i].dataValues.securityFriend === "trust") {
          let jason = {
            id: results[i].dataValues.id,
            id_User: results[i].dataValues.id_User,
            id_Friend: results[i].dataValues.id_Friend,
            username: results[i].UserFriendOwner.dataValues.username,
            name: results[i].UserFriendOwner.dataValues.name,
            photos: results[i].UserFriendOwner.dataValues.photos,
            email: results[i].UserFriendOwner.dataValues.email,
            DDD: results[i].UserFriendOwner.dataValues.DDD,
            cellPhoneNumber:
              results[i].UserFriendOwner.dataValues.cellPhoneNumber,
          };
          send.push(jason);
        } else {
          let jason = {
            id: results[i].dataValues.id,
            id_User: results[i].dataValues.id_User,
            id_Friend: results[i].dataValues.id_Friend,
            username: results[i].UserFriendOwner.dataValues.username,
            photos: results[i].UserFriendOwner.dataValues.photos,
          };
          send.push(jason);
        }
      }
      return send;
    } catch (err) {
      return err;
    }
  }
  static async refuseInvite(my, friend) {
    try {
      const update = await UsersFriends.update(
        { status_friendships: "" },
        {
          where: {
            id_User: friend,
            status_friendships: "invited",
            id_Friend: my,
          },
        }
      );
      return update;
    } catch (err) {
      return err;
    }
  }
  static async findRemoveFriends(my, friend) {
    try {
      const find = await UsersFriends.findOne({
        where: {
          [Op.or]: [
            { id_Friend: friend, id_User: my, status_friendships: "accepted" },
            { id_Friend: my, id_User: friend, status_friendships: "accepted" },
          ],
        },
      });
      return find;
    } catch (err) {
      return err;
    }
  }
  static async removeFriends(my, friend) {
    try {
      const update1 = await UsersFriends.update(
        { status_friendships: "", securityFriend: "" },
        {
          where: {
            id_User: my,
            id_Friend: friend,
            status_friendships: "accepted",
          },
        }
      );
      const update2 = await UsersFriends.update(
        { status_friendships: "", securityFriend: "" },
        {
          where: {
            id_User: friend,
            id_Friend: my,
            status_friendships: "accepted",
          },
        }
      );

      const update = { update1, update2 };

      return update;
    } catch (err) {
      return err;
    }
  }
  static async getTrustInvites(pk) {
    try {
      const results = await conn.query(
        `SELECT UserFriends.id,UserFriends.status_friendships,UserFriends.securityFriend,UserFriends.id_User, UserFriends.id_Friend, UserOwner.id, UserOwner.username, UserOwner.photos FROM users_friends AS UserFriends LEFT OUTER JOIN users AS UserOwner ON UserFriends.id_User = UserOwner.id WHERE UserFriends.id_Friend = ${pk} AND UserFriends.status_friendships = 'accepted' AND UserFriends.securityFriend = 'askTrust';`
      );
      return results[0];
    } catch (err) {
      return err;
    }
  }
  static async getSentTrustInvites(pk) {
    try {
      const results = await conn.query(
        `SELECT UserFriends.id,UserFriends.status_friendships,UserFriends.securityFriend,UserFriends.id_User, UserFriends.id_Friend, UserOwner.id, UserOwner.username, UserOwner.photos FROM users_friends AS UserFriends LEFT OUTER JOIN users AS UserOwner ON UserFriends.id_Friend = UserOwner.id WHERE UserFriends.id_User = ${pk} AND UserFriends.status_friendships = 'accepted' AND UserFriends.securityFriend = 'askTrust';`
      );

      return results[0];
    } catch (err) {
      return err;
    }
  }
  static async getFindConfirmTrust(my, friend, status, where) {
    try {
      const find = await UsersFriends.findOne({
        where: {
          [Op.or]: [
            {
              id_Friend: friend,
              id_User: my,
              status_friendships: status,
              securityFriend: where,
            },
            {
              id_Friend: my,
              id_User: friend,
              status_friendships: status,
              securityFriend: where,
            },
          ],
        },
      });
      return find;
    } catch (err) {}
  }
  static async confirmTrust(my, friend, status) {
    try {
      const update1 = await UsersFriends.update(
        { securityFriend: status },
        { where: { id_User: friend, id_Friend: my } }
      );
      const update2 = await UsersFriends.update(
        { securityFriend: status },
        { where: { id_User: my, id_Friend: friend } }
      );
      const confirmed = { update1, update2 };
      return confirmed;
    } catch (err) {
      return err;
    }
  }
  static async findDeniedTrust(my, friend, where1, where2) {
    try {
      const find = await UsersFriends.findOne({
        where: {
          id_User: friend,
          id_Friend: my,
          status_friendships: where1,
          securityFriend: where2,
        },
      });
      return find;
    } catch (err) {
      return err;
    }
  }
  static async updateTrust(my, friend, status, where1, where2) {
    try {
      const update1 = await UsersFriends.update(
        { securityFriend: status },
        {
          where: {
            id_User: my,
            id_Friend: friend,
            status_friendships: where1,
            securityFriend: where2,
          },
        }
      );
      const update2 = await UsersFriends.update(
        { securityFriend: status },
        {
          where: {
            id_User: friend,
            id_Friend: my,
            status_friendships: where1,
            securityFriend: where2,
          },
        }
      );
      const updated = { update1, update2 };
      return updated;
    } catch (err) {
      return err;
    }
  }
  static async updateOneTrust(my, friend, status, where1, where2) {
    try {
      const update = await UsersFriends.update(
        { securityFriend: status },
        {
          where: {
            id_User: my,
            id_Friend: friend,
            status_friendships: where1,
            securityFriend: where2,
          },
        }
      );

      return update;
    } catch (err) {
      return err;
    }
  }
}

module.exports = UserFriendsServices;
