const config = require('../../config/database.json');
const Sequelize = require('sequelize');

const conn = new Sequelize(config);

module.exports = conn;