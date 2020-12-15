module.exports = {
  isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return obj;
    }

    return false;
  },
};
