const express = require("express");
const router = express.Router();

//Importanndo os pacotes do node

const auth = require("./middleware/auth.js");
const admin = require("./middleware/admin.js");
const error = require("./middleware/error");

//Pegando os middlewares

const login = require("./routes/login/routes.js");
const email = require("./routes/routes.js");
const manager = require("./routes/managerLogin/routes.js");
const friends = require("./routes/managerFriendship/routes.js");
const administrator = require("./routes/admin/routes");
const favorites = require("./routes/user/favoritePlaces.js");
const events = require("./routes/user/events.js");
const historic = require("./routes/user/history");
const search = require("./routes/user/search.js");
const map = require("./routes/map/map.js");

// pegando as rotas

router.use("/login", login);
router.use("/send", email);
router.use("/user", [auth], manager);
router.use("/user", [auth], friends);
router.use("/admin", [auth, admin], administrator);
router.use("/favorites", [auth], favorites);
router.use("/event", [auth], events);
router.use("/historic", [auth], historic);
router.use("/search", [auth], search);
router.use("/map", [auth], map);

router.use(error);
// onde as rotas estao

module.exports = router;
//exportando as rotas
