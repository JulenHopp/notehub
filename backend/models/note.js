'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {
      Note.belongsToMany(models.Category, {
        through: 'NoteCategory',
        as: 'categories',
        foreignKey: 'NoteId'
      });
    }
  }
  Note.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Note',
  });
  return Note;
};
