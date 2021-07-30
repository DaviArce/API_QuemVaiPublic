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
    } else {
      try {
        const find = await UsersService.getUsersByEmail(email);
        if (find[0]) {
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
    const { id } = req.user;
    const { email, confirmPass, password } = req.body;
    if (password != "" && email != "" && confirmPass != "") {
      try {
        const result = await UsersService.getUsersByPk(id);
        if (!result) {
          return res.status(204).send({ "User found": null });
        }
        const validPassword = await Crypt.compareHash(
          password,
          result.password
        );
        if (
          email == result.dataValues.email &&
          password == confirmPass &&
          validPassword
        ) {
          const result = await UsersService.deleteUser(id, email);
          if (result.changedRows > 0) {
            return res.send({ "User deleted": true });
          } else {
            return res.send({
              Updated: false,
              Result: receive.info,
              Info: "The fields was not updated because the new value is equal than old value",
            });
          }
        } else {
          return res
            .status(406)
            .send({ Error: "Please send the correct email and password" });
        }
      } catch (err) {
        next(err);
      }
    } else {
      return res.status(400).send({ Error: "Email and Password is required" });
    }
  }
  // Function to update users things
  static async update(req, res, next) {
    const { id } = req.user;
    const {
      cellPhoneNumber,
      email,
      password,
      confirmPass,
      DDD,
      name,
      username,
    } = req.body;
    if (password != "" && email != "") {
      try {
        const result = await UsersService.getUsersByPk(id);
        const validPassword = await Crypt.compareHash(
          password,
          result.password
        );
        if (
          email == result.dataValues.email &&
          password == confirmPass &&
          validPassword
        ) {
          if (!result) {
            return res.status(204).send({ "User found": null });
          } else {
            const validPassword = await Crypt.compareHash(
              password,
              result.password
            );
            if (!validPassword || email != result.email) {
              return res
                .status(406)
                .send({ Error: "Please send the correct email and password" });
            } else {
              const receive = await UsersService.updateUser(
                cellPhoneNumber,
                DDD,
                name,
                username,
                email,
                result
              );
              if (receive.changedRows > 0) {
                return res.send({ Updated: true });
              } else {
                return res.send({
                  Updated: false,
                  Result: receive.info,
                  Info: "The fields was not updated because the new value is equal than old value",
                });
              }
            }
          }
        } else {
          return res
            .status(406)
            .send({ Error: "Please send the correct email and password" });
        }
      } catch (err) {
        next(err);
      }
    } else {
      return res.status(400).send({ Error: "Email and Password is required" });
    }
  }
  // Function to update user photo
  // Photo things is going to be refactor after the DEV find the a new way to upload photos
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
  // Photo things is going to be refactor after the DEV find the a new way to upload photos
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
    const { id } = req.user;
    const newPassword = req.header("x-new-password");
    const currentPassword = req.header("x-current-password");
    const confirmPassword = req.header("x-confirm-password");

    const { email } = req.body;
    if (
      currentPassword == "" ||
      confirmPassword == "" ||
      email == "" ||
      newPassword == ""
    ) {
      return res.status(400).send({ Error: "Email and Password are required" });
    } else {
      try {
        const result = await UsersService.getUsersByPk(id);
        if (!result) {
          return res.status(204).send({ "User found": null });
        } else {
          const validPassword = await Crypt.compareHash(
            currentPassword,
            result.password
          );
          if (
            currentPassword == confirmPassword &&
            validPassword &&
            email == result.dataValues.email
          ) {
            const updatedHash = await Crypt.generateHash(newPassword);
            const result = await UsersService.updatePassword(
              id,
              email,
              updatedHash
            );
            if (result.changedRows > 0) {
              const token = await Crypt.generateToken(email);
              return res.send({ Updated: true, "Warn": "Please make the sign in again" });
            } else {
              return res.send({
                Updated: false,
                Result: result.info,
                Info: "The password was not updated because the new value is equal than old value",
              });
            }
          } else {
            return res
              .status(406)
              .send({ Error: "Please send the correct email and password" });
          }
        }
      } catch (err) {
        next(err);
      }
    }
  }
  // Function to update the user email
  static async updateEmail(req, res, next) {
    const { id } = req.user;
    const { email, newEmail, password, confirmPassword } = req.body;
    if (
      email == "" ||
      newEmail == "" ||
      password == "" ||
      confirmPassword == ""
    ) {
      return res.status(400).send({ Error: "Check if you sent the values" });
    } else {
      try {
        const result = await UsersService.getUsersByPk(id);
        if (!result) {
          return res.status(204).send({ "User found": null });
        } else {
          const validPassword = await Crypt.compareHash(
            password,
            result.password
          );
          if (
            password == confirmPassword &&
            validPassword &&
            email == result.dataValues.email
          ) {
            const result = await UsersService.updateEmail(id, email);
            if (result.changedRows > 0) {
              const token = await Crypt.generateToken(email);
              return res.send({ Updated: true, "Warn": "Please make the sign in again" });
            } else {
              return res.send({
                Updated: false,
                Result: result.info,
                Info: "The password was not updated because the new value is equal than old value",
              });
            }
          } else {
            return res
              .status(406)
              .send({ Error: "Please send the correct email and password" });
          }
        }
      } catch (err) {
        next();
      }
    }
  }
}

module.exports = UserControllers;
