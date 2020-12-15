const express = require("express");
const routes = express.Router();

const UserFriendController = require("../../controllers/friendship/UserFriendController.js");
const TrustedController = require("../../controllers/friendship/TrustedFriendController.js");

routes.post("/invite/:id_friend", UserFriendController.inviteFriend);
routes.get("/invite", UserFriendController.getInvites);
routes.get("/invite/sent", UserFriendController.getSentInvites);
routes.put("/invite/accept/:id_friend", UserFriendController.acceptInvites);
routes.get("/friends", UserFriendController.getFriends);
routes.put("/invite/refuse/:id_friend", UserFriendController.refuseInvites);
routes.put("/friend/remove/:id_friend", UserFriendController.removeFriend);
routes.put("/invite/cancel/:id_friend", UserFriendController.cancelInvite);

// User_Friends

routes.post("/trust/invite/:id_friend", TrustedController.askTrust);
routes.get("/trust/invite/getInvite", TrustedController.getTrustInvites);
routes.get("/trust/invite/getSentInvite", TrustedController.getSentTrustInvite);
routes.put("/trust/invite/accept/:id_friend", TrustedController.confirmTrust);
routes.put("/trust/invite/refuse/:id_friend", TrustedController.deniedTrust);
routes.put("/trust/invite/remove/:id_friend", TrustedController.removeTrust);
routes.put("/trust/invite/cancel/:id_friend", TrustedController.cancelInvite);

//
module.exports = routes;
