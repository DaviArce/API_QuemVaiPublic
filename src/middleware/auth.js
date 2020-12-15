const jwt = require("jsonwebtoken");
const config = require("../config/custom-environment-variables.json");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(500).send({ auth: false, message: "No token provided." });
  }
  try {
    const decoded = jwt.verify(token, config.jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (err) {
    res
      .status(500)
      .send({ auth: false, message: "Failed to authenticate token." });
  }
}
module.exports = auth;
