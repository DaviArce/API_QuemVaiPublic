const SpaceLocalizationServices = require("../../services/SpaceLocalizationsServices.js");
const CEPVerifier = require("../../services/API/CEP.Verifyer");
const Geocoding = require("../../services/API/Geocoding");
class SpacesControllers {
  static async add(req, res, next) {
    const { name, number, CEP, description } = req.body;

    try {
      const search = await CEPVerifier.verifyCep(CEP);
      if (search.erro == true) {
        return res.status(400).send({ "CEP is invalid": true });
      }
      const location = `${search.logradouro} ${number}, ${search.bairro}, ${search.localidade}`;
      const auxAddress = `${search.logradouro.split(" ").join("+")}+${number}+${CEP}+${search.bairro.split(" ").join("+")}${search.localidade.split(" ").join("+")}`;
      
      const response = await Geocoding.geocode(auxAddress);

      if (response["features"].length < 1) {
        return res.status(400).send({ "Place not found": true });
      }
      const latitude = response["features"][0]["center"][1];
      const longitude = response["features"][0]["center"][0];

      const result = await SpaceLocalizationServices.getSpace(latitude, longitude);

      if (result) {
        return res.status(204).send({ "Space found": null });
      }
      const create = await SpaceLocalizationServices.createSpace(
        name,
        location,
        search.cep,
        latitude,
        longitude,
        description,
        search.uf
      );

      return res.json({ "Space created": true });
    } catch (err) {
      next(err);
    }
  }

  static async index(req, res, next) {
    const { id_space } = req.params;
    try {
      const search = await SpaceLocalizationServices.getSpaceSportsById(
        id_space
      );

      if (!search) {
        return res.status(204).send({ "Space found": null });
      }
      return res.json(search);
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      const all = await SpaceLocalizationServices.getAllSpaceSports();

      if (!all) {
        return res.status(204).send({ "Spaces found": null });
      }

      return res.json(all);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    const { id_space } = req.params;
    const { name, description } = req.body;
    try {
      const result = await SpaceLocalizationServices.getById(id_space);
      if (!result) {
        return res.status(204).send({ "Spaces found": null });
      }
      const update = await SpaceLocalizationServices.updateSpaces(
        name,
        description,
        id_space
      );
      return res.json({ Updated: true });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    const { id_space } = req.params;
    try {
      const find = await SpaceLocalizationServices.getById(id_space);
      if (!find) {
        return res.status(204).send({ "Space found": null });
      }
      const erase = await SpaceLocalizationServices.deleteSpace(id_space);

      return res.json({ Deleted: true });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SpacesControllers;
