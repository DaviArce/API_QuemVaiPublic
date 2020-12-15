const UsersServices = require("../../services/UsersServices.js");
const UserFriendsServices = require("../../services/UserFriendServices");

class UserFriendsController {
  static async inviteFriend(req, res, next) {
    const my_id = req.user.id;
    const { id_friend } = req.params;
    //Verifcação se não existe o id do amigo
    if (!id_friend) {
      return res.status(204).send({ "ID of your friend not sent": true });
    }
    // verificação se o id do amigo n é igual ao seu
    if (my_id == id_friend) {
      return res.status(422).send({ "Equals id's": true });
    }
    try {
      // Vai verficar se o usario existe
      const result = await UsersServices.getUsersByPk(id_friend);

      if (!result) {
        return res.status(204).send({ "Friend found": null });
      }
      //Vai ver se tem alguma relaçao entre nos no banco
      const search = await UserFriendsServices.findFriends(my_id, id_friend);

      if (search) {
        if (
          search.dataValues.status_friendships === "" ||
          search.dataValues.status_friendships === null
        ) {
          if (search.dataValues.id_User == my_id) {
            const status = "invited";
            const invite = await UserFriendsServices.updateFriendShipStatus(
              my_id,
              id_friend,
              status
            );

            return res.send({ "Request sent": true });
          } else if (search.dataValues.id_Friend == my_id) {
            const status = "invited";
            const invite = await UserFriendsServices.updateFriendShipStatus(
              id_friend,
              my_id,
              status
            );

            return res.send({ "Request sent": true });
          } else {
            const invite = await UserFriendsServices.createInvite(
              my_id,
              id_friend
            );

            return res.json({ "Request sent": true });
          }
        } else {
          return res.status(406).send({ "Request already sended": true });
        }
      } else {
        const invite = await UserFriendsServices.createInvite(my_id, id_friend);
        return res.json({ "Request sent": true });
      }
    } catch (err) {
      next(err);
    }
  }

  static async getInvites(req, res, next) {
    const my_id = req.user.id;
    try {
      const results = await UserFriendsServices.getInvites(my_id);

      if (!results) {
        return res.status(204).send({ "Invites found": null });
      }
      return res.json(results);
    } catch (err) {
      next(err);
    }
  }
  static async getSentInvites(req, res, next) {
    const my_id = req.user.id;
    try {
      const results = await UserFriendsServices.getSentInvites(my_id);

      if (!results) {
        return res.status(204).send({ "Invites found": null });
      }
      return res.json(results);
    } catch (err) {
      next(err);
    }
  }

  static async acceptInvites(req, res, next) {
    const { id_friend } = req.params;
    const my_id = req.user.id;
    if (!id_friend) {
      return res.status(204).send({ "id of your friend not sent": true });
    }
    try {
      const status = "invited";
      const result = await UserFriendsServices.getInvitesAccept(
        my_id,
        id_friend,
        status
      );

      if (!result) {
        return res.status(204).send({ "Invites found": null });
      }
      if (result.dataValues.id_User == my_id) {
        return res.status(422).send({ "Equals id's": true });
      }
      const status1 = "accepted";
      const whereStatus = "invited";
      const update = await UserFriendsServices.updateInviteStatus(
        my_id,
        id_friend,
        status1,
        whereStatus
      );

      const search = await UserFriendsServices.getEmptyFriendship(
        my_id,
        id_friend
      );

      if (!search) {
        const create = await UserFriendsServices.createRelationship(
          my_id,
          id_friend
        );
        return res.send({ "Request accepted": true });
      }

      const create = await UserFriendsServices.fillEmptyFriendship(
        my_id,
        id_friend
      );

      return res.send({ "Request accepted": true });
    } catch (err) {
      next(err);
    }
  }

  static async getFriends(req, res, next) {
    const my_id = req.user.id;

    try {
      const send = await UserFriendsServices.getFriends(my_id);
      if (!send) {
        return res.status(204).send({ "Friends found": null });
      }
      return res.json(send);
    } catch (err) {
      next(err);
    }
  }

  static async refuseInvites(req, res, next) {
    const { id_friend } = req.params;
    const my_id = req.user.id;
    try {
      if (id_friend === my_id) {
        return res.status(422).send({ "Equals id's": true });
      }
      const status = "invited";
      const result = await UserFriendsServices.getInvitesAccept(
        my_id,
        id_friend,
        status
      );
      if (!result) {
        return res.status(204).send({ "Invites found": null });
      }
      const status1 = "";
      const whereStatus = "invited";
      const update = await UserFriendsServices.updateInviteStatus(
        my_id,
        id_friend,
        status1,
        whereStatus
      );

      return res.json({ "Request denied": true });
    } catch (err) {
      next(err);
    }
  }

  static async removeFriend(req, res, next) {
    const { id_friend } = req.params;
    const my_id = req.user.id;
    if (!id_friend) {
      return res.status(204).send({ "id of your friend not sent": true });
    }
    try {
      if (id_friend === my_id) {
        return res.status(422).send({ "Equals id's": true });
      }
      const find = await UserFriendsServices.findRemoveFriends(
        my_id,
        id_friend
      );
      if (!find) {
        return res.status(204).send({ "Friends found": null });
      }
      const update = await UserFriendsServices.removeFriends(my_id, id_friend);

      return res.json({ Removed: true });
    } catch (err) {
      next(err);
    }
  }

  static async cancelInvite(req, res, next) {
    const { id_friend } = req.params;
    const my_id = req.user.id;
    if (!id_friend) {
      return res.status(204).send({ "id of your friend not sent": true });
    }
    try {
      if (id_friend === my_id) {
        return res.status(406).send({ "Equals id's": true });
      }
      const status = "invited";
      const result = await UserFriendsServices.getInvitesAccept(
        id_friend,
        my_id,
        status
      );
      if (!result) {
        return res.status(204).send({ "Invites found": null });
      }
      const where = "invited";
      const status1 = "";
      const update = await UserFriendsServices.updateInviteStatus(
        id_friend,
        my_id,
        status1,
        where
      );

      return res.json({ "Request canceled": true });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserFriendsController;
