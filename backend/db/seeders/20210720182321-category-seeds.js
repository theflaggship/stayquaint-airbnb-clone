'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Categories', [
        { type: "Hotel", createdAt: new Date(), updatedAt: new Date() },
        { type: "Inn", createdAt: new Date(), updatedAt: new Date() },
        { type: "Bed & Breakfast", createdAt: new Date(), updatedAt: new Date() },
        { type: "Cabin", createdAt: new Date(), updatedAt: new Date() },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Categories', null, {});
  }
};
