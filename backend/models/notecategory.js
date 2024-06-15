'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NoteCategory extends Model {}
  NoteCategory.init({
    NoteId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'NoteCategory',
  });
  return NoteCategory;
};
