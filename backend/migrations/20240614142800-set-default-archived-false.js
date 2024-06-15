'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Cambiar la columna para que no permita NULL y tenga un valor predeterminado de FALSE
    await queryInterface.changeColumn('Notes', 'archived', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revertir los cambios realizados en la migración
    await queryInterface.changeColumn('Notes', 'archived', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: null
    });
  }
};
