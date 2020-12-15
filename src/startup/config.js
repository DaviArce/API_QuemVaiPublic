const config = require("../config/custom-environment-variables.json");
module.exports = function () {
  if (!config.jwtPrivateKey) {
    throw new Error("Fatal ERROR: private key not defined");
  }
};
