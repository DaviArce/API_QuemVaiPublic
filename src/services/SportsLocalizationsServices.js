const SportsLocalization = require("../data/models/Sports_Localizations.js");

class SportsLocalizationService {
  static async createRelation(id_sports, id_space) {
    try {
      const [add] = await SportsLocalization.findOrCreate({
        where: {
          id_sports,
          id_space,
        },
      });
      return add;
    } catch (err) {
      return err;
    }
  }
  static async findSportsInSpace(id_sports, id_space) {
    try {
      const find = await SportsLocalization.findOne({
        where: {
          id_sports,
          id_space,
        },
      });
      return find;
    } catch (err) {
      return err;
    }
  }
}

module.exports = SportsLocalizationService;
