"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("events", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      id_space: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "space_localizations",
          key: "id",
        },
      },
      id_sport: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "sports",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_author: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name_event: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      event_date: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER(50),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      finished_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("events");
  },
};
