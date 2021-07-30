const jwt = require("jsonwebtoken");
const config = require("../config/custom-environment-variables.json");
const UserServices = require("../services/UsersServices.js");

async function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(500).send({ auth: false, message: "No token provided." });
  } 
  else {
    try {
      const decoded = jwt.verify(token, config.jwtPrivateKey);
      req.user = decoded.result[0];
      const result = await UserServices.getUsersByIndex(decoded.result[0].id);
      if(result[0].status == "deleted" || result[0].status == "banned"){
        return res.status(401).send("Invalid account");
      }
      else{
        next();
      }
      
    } catch (err) {
      res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
  }
}
module.exports = auth;
