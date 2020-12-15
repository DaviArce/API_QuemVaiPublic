const UserFriendServices = require("../../services/UserFriendServices.js");

class TrustedFriendController {
  static async askTrust(req, res, next) {
    const { id_friend } = req.params;
    const my_id = req.user.id;
    if (!id_friend) {
      return res.status(204).send({ "id of your friend not sent": true });
    }
    try {
      if (id_friend === my_id) {
        return res.status(422).send({ "Equals id's": true });
      }
      const find = await UserFriendServices.findRemoveFriends(my_id, id_friend);
      if (!find) {
        return res.status(204).send({ "Friendship found": null });
      }
      if (
        find.dataValues.securityFriend === "" ||
        find.dataValues.securityFriend === null
      ) {
        const status = "askTrust";
        const update = await UserFriendServices.updateSecurityFriend(
          my_id,
          id_friend,
          status
        );

        return res.send({ "solicitation": true });
      }
      return res.status(400).send({ "solicitation": false });
    } catch (err) {
      next(err);
    }
  }
  static async getTrustInvites(req, res, next) {
    const myId = req.user.id;
    try {
      const results = await UserFriendServices.getTrustInvites(myId);

      if (!results) {
        return res.status(204).send({ "Trust invites found": null });
      }

      return res.json(results);
    } catch (err) {
      next(err);
    }
  }
  static async getSentTrustInvite(req, res, next) {
    const myId = req.user.id;
    try {
      const results = await UserFriendServices.getSentTrustInvites(myId);

      if (!results) {
        return res.status(204).send({ "Trust invites found": null });
      }

      return res.json(results);
    } catch (err) {
      next(err);
    }
  }

  static async confirmTrust(req, res, next) {
    const { id_friend } = req.params;
    const my_id = req.user.id;
    if (!id_friend) {
      return res.status(204).send({ "id of your friend not sent": true });
    }
    try {
      const status = "accepted";
      const where = "askTrust";
      const find = await UserFriendServices.getFindConfirmTrust(
        my_id,
        id_friend,
        status,
        where
      );

      if (!find) {
        return res.status(204).send({ "Invites found": null });
      }
      if (find.dataValues.securityFriend !== "askTrust") {
        return res.status(400).send({ "Trust invites found": null });
      }
      if (find.dataValues.id_User === my_id) {
        return res.status(422).send({ "Equals id's": true });
      }
      const status1 = "trust";

      const update = await UserFriendServices.confirmTrust(
        my_id,
        id_friend,
        status1
      );
      return res.send({ "friendship": true });
    } catch (err) {
      next(err);
    }
  }
  static async deniedTrust(req, res, next) {
    const { id_friend } = req.params;
    const my_id = req.user.id;
    if (!id_friend) {
      return res.status(204).send({ "id of your friend not sent": true });
    }
    try {
      if (id_friend === my_id) {
        return res.status(422).send({ "Equals id's": true });
      }
      const where1 = "accepted";
      const where2 = "askTrust";
      const find = await UserFriendServices.findDeniedTrust(
        my_id,
        id_friend,
        where1,
        where2
      );

      if (!find) {
        return res.status(204).send({ "Invite found": null });
      }
      if (
        find.dataValues.securityFriend === null ||
        find.dataValues.securityFriend === ""
      ) {
        return res.status(204).send({ "Trust invite found": null });
      }
      if (find.dataValues.id_User === my_id) {
        return res.status(422).send({ "Equals id's": true });
      }
      const status = "";

      const update = await UserFriendServices.updateTrust(
        my_id,
        id_friend,
        status,
        where1,
        where2
      );

      return res.send({ "Refused trust invite": true });
    } catch (err) {
      next(err);
    }
  }
  static async removeTrust(req, res) {
    const { id_friend } = req.params;
    const my_id = req.user.id;
    if (!id_friend) {
      return res.status(204).send({ "id of your friend not sent": true });
    }

    try {
      if (id_friend === my_id) {
        return res.status(422).send({ "Equals id's": true });
      }
      const status = "accepted";
      const where = "trust";
      const find = await UserFriendServices.getFindConfirmTrust(
        my_id,
        id_friend,
        status,
        where
      );
      if (!find) {
        return res.status(204).send({ "Friendship found": null });
      }

      const status1 = "";
      const where1 = "accepted";
      const where2 = "trust";
      const update = await UserFriendServices.updateTrust(
        my_id,
        id_friend,
        status1,
        where1,
        where2
      );

      return res.send({ Deleted: true });
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
        return res.status(422).send({ "Equals id's": true });
      }
      const status = "";
      const where1 = "accepted";
      const where2 = "askTrust";

      const find = await UserFriendServices.findDeniedTrust(
        id_friend,
        my_id,
        where1,
        where2
      );

      if (!find) {
        return res.status(204).send({ "Friendship found": null });
      }
      if (
        find.dataValues.securityFriend === null ||
        find.dataValues.securityFriend === ""
      ) {
        return res.status(406).send("Trust solicitation not asked");
      }
      if (find.dataValues.id_Friend === my_id) {
        return res.status(422).send({ "Equals id's": true });
      }

      const update = await UserFriendServices.updateOneTrust(
        my_id,
        id_friend,
        status,
        where1,
        where2
      );

      return res.send({ TrustDenied: update });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = TrustedFriendController;
