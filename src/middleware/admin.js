module.exports = function (req, res, next) {
  if (req.user.isAdmin === false) {
    //401 not authorized
    //403 forbidden
    return res.status(403).send("Access denied");
  }
  next();
};
