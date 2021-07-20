'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Addresses', [
        { addressLineOne: "26600 Oliver Rd", addressLineTwo: null, city: "Carmel", state: "CA", postalCode: "93923", country: "United States", createdAt: new Date(), updatedAt: new Date() },
        { addressLineOne: "20 Via Contenta", addressLineTwo: null, city: "Carmel Valley", state: "CA", postalCode: "93924", country: "United States", createdAt: new Date(), updatedAt: new Date() },
        { addressLineOne: "10 Flight Rd", addressLineTwo: null, city: "Carmel Valley", state: "CA", postalCode: "93924", country: "United States", createdAt: new Date(), updatedAt: new Date() },
        { addressLineOne: "46800 CA-1", addressLineTwo: null, city: "Big Sur", state: "CA", postalCode: "93920", country: "United States", createdAt: new Date(), updatedAt: new Date() },
        { addressLineOne: "33200 E Carmel Valley Rd", addressLineTwo: null, city: "Carmel Valley", state: "CA", postalCode: "93924", country: "United States", createdAt: new Date(), updatedAt: new Date() },
        { addressLineOne: "4TH Ave And Dolores St", addressLineTwo: null, city: "Carmel", state: "CA", postalCode: "93921", country: "United States", createdAt: new Date(), updatedAt: new Date() },
        { addressLineOne: "Ocean Ave & Torres St", addressLineTwo: null, city: "Carmel", state: "CA", postalCode: "93923", country: "United States", createdAt: new Date(), updatedAt: new Date() },
        { addressLineOne: "Junipero St & 8th Ave", addressLineTwo: null, city: "Carmel", state: "CA", postalCode: "93923", country: "United States", createdAt: new Date(), updatedAt: new Date() },
        { addressLineOne: "26270 Dolores St", addressLineTwo: null, city: "Carmel", state: "CA", postalCode: "93923", country: "United States", createdAt: new Date(), updatedAt: new Date() },
        { addressLineOne: "San Antonio & Eighth St", addressLineTwo: null, city: "Carmel", state: "CA", postalCode: "93921", country: "United States", createdAt: new Date(), updatedAt: new Date() },
        { addressLineOne: "Ocean Ave & Camino Real", addressLineTwo: null, city: "Carmel", state: "CA", postalCode: "93923", country: "United States", createdAt: new Date(), updatedAt: new Date() },
        { addressLineOne: "Camino Real & 8th Ave", addressLineTwo: null, city: "Carmel", state: "CA", postalCode: "93921", country: "United States", createdAt: new Date(), updatedAt: new Date() }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Addresses', null, {});
  }
};
