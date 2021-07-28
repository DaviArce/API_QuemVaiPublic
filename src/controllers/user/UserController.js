const Crypt = require("../../utils/Crypt.js");
const UsersService = require("../../services/UsersServices.js");
const Upload = require("../../utils/UploadImage.js");

class UserControllers {
  //Function to create users in the application
  static async signup(req, res, next) {
    const password = req.header("x-password");
    const { cellPhoneNumber, email, DDD, name, username, photos } = req.body;
    if (
      cellPhoneNumber == "" ||
      email == "" ||
      DDD == "" ||
      name == "" ||
      username == ""
    ) {
      return res
        .send({
          Error: "Check if the fields is not empty",
        })
        .status(406);
      /* Increase this validation */
    } else {
      try {
        const find = await UsersService.getUsersByEmail(email);
        console.log(find);

        if (find[0] == "") {
          return res.status(406).send({ "User already registered": true });
        }
        const hash = await Crypt.generateHash(password);
        const upload = await Upload.uploadPhoto(photos);
        await UsersService.createUser(
          cellPhoneNumber,
          DDD,
          name,
          username,
          hash,
          email,
          upload
        );

        const token = await Crypt.generateToken(email);
        return res
          .header({ "x-auth-token": token })
          .send({ "User registered": true });
      } catch (err) {
        next(err);
      }
    }
  }
  // Function to deletes users from the application
  static async delete(req, res, next) {
    const user_id = req.user.result;
    // fix the variable who is receiving the data for the OBJECT
    console.log(user_id[0]);
    try {
      const result = await UsersService.getUsersByPk(user_id);

      if (!result) {
        return res.status(204).send({ "User found": null });
      }
      await UsersService.deleteUser(user_id,user_email);

      return res.send({ "User deleted": true });
    } catch (err) {
      next(err);
    }
  }
  // Function to update users things
  static async update(req, res, next) {
    const user_id = req.user.result.id;
    const { cellPhoneNumber, email, user_email_confirm, DDD, name, username } =
      req.body;
    try {
      const result = await UsersService.getUsersByPk(user_id);

      if (!result) {
        return res.status(204).send({ "User found": null });
      }
      //vao me passar o email dele que esta agora e o se tiver alteração
      // caso o os dois email diferem diferente é pq ele quer alterar o email
      const findEmail = await UsersService.getUsersByEmail(email);
      if (findEmail && email != user_email_confirm) {
        return res.status(406).send({ "Email already registered": true });
      }
      if (findEmail && email == user_email_confirm) {
        const update = await result.update({
          cellPhoneNumber: cellPhoneNumber,
          DDD: DDD,
          name: name,
          username: username,
        });
        return res.send({ Updated: true });
      }
      const update = await result.update({
        cellPhoneNumber: cellPhoneNumber,
        email: email,
        DDD: DDD,
        name: name,
        username: username,
      });
      return res.send({ Updated: true });
    } catch (err) {
      //mandar o tonho fazer a pesquisa primeiro e se n tiver essa alteração envia os dados antigos de novo
      next(err);
    }
  }
  // Function to update user photo
  static async updatePhoto(req, res, next) {
    const user_id = req.user.result.id;
    const { photos } = req.body;
    if (!photos) {
      return res.status(204).send({ "Not photo sent": true });
    }
    try {
      const result = await UsersService.getUsersByPk(user_id);

      if (!result) {
        return res.status(204).send({ "User found": null });
      }
      const photo = await Upload.uploadPhoto(photos);

      const update = await result.update({ photos: photo });
      return res.send({ "Photo updated": true });
    } catch (err) {
      next(err);
    }
  }
  // Function to delete the user photo
  static async deletePhoto(req, res, next) {
    const user_id = req.user.result.id;
    const value = undefined;
    try {
      const find = await UsersService.getUsersByPk(user_id);
      if (!find) {
        return res.status(204).send({ "User found": null });
      }
      const photo = await Upload.uploadPhoto(value);
      const update = await find.update({ photos: photo });
      return res.send({ "Photo deleted": true });
    } catch (err) {
      next(err);
    }
  }
  // Function to update the user password
  static async updatePassword(req, res, next) {
    const user_id = req.user.result.id;
    const password = req.header("x-new-password");
    if (!password) {
      return res.status(204).send({ "Password not sent": true });
    }
    try {
      const result = await UsersService.getUsersByPk(user_id);

      if (!result) {
        return res.status(204).send({ "User found": null });
      }

      const email = result.dataValues.email;

      const newPassword = await Crypt.generateHash(password);

      const update = await result.update({ password: newPassword });

      const token = await Crypt.generateToken(email);

      return res.send({ Updated: true, " New token": token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserControllers;
