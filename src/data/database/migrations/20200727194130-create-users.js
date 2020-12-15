"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(1024),
        allowNull: false,
      },
      cellPhoneNumber: {
        type: Sequelize.INTEGER(11),
      },
      DDD: {
        type: Sequelize.INTEGER(3),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      photos: {
        type: Sequelize.STRING(),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
