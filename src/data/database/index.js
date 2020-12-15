const conn = require("./connectionFactory");

const Users = require("../models/Users.js");
const UserFriend = require("../models/UserFriends.js");
const Sports = require("../models/Sports");
const Space_Localizations = require("../models/Space_Localizations");
const Sports_Localizations = require("../models/Sports_Localizations");
const Email = require("../models/Email.js");
const Email_Admin = require("../models/Email_Admin.js");
const Favorites_Places = require("../models/Favorites_Places.js");
const Events = require("../models/Events.js");
const UserEvents = require("../models/UserEvents.js");

function GetConn() {
  conn
    .authenticate()
    .then(() => {
      console.log("Connection has been established on database");
      Users.init(conn);
      UserFriend.init(conn);
      Sports.init(conn);
      Space_Localizations.init(conn);
      Sports_Localizations.init(conn);
      Email.init(conn);
      Email_Admin.init(conn);
      Favorites_Places.init(conn);
      Events.init(conn);
      UserEvents.init(conn);

      Users.associate(conn.models);
      UserFriend.associate(conn.models);
      Sports.associate(conn.models);
      Space_Localizations.associate(conn.models);
      Email.associate(conn.models);
      Email_Admin.associate(conn.models);
      Events.associate(conn.models);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = GetConn;
