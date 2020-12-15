const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.error(err.message, err);
  return res.status(500).send({ "Unexpected internal error in server": err });
};
