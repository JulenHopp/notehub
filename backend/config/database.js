const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('notes_app', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
