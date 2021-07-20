'use strict';

const bcrypt = require('bcryptjs');


module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [
        {
          email: 'demo@user.io',
          username: 'Demo',
          hashedPassword: bcrypt.hashSync('password'),
        },
        {
          email: 'monte@user.com',
          username: 'theflaggship',
          hashedPassword: bcrypt.hashSync('password'),
        },
        {
          email: 'joy@user.com',
          username: 'joyb',
          hashedPassword: bcrypt.hashSync('password'),
        },
        {
          email: 'jared@user.com',
          username: 'jaredf',
          hashedPassword: bcrypt.hashSync('password'),
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
