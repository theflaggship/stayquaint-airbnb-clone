'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Lodgings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      addressId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Addresses'}
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Categories' }
      },
      breakfast: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      pool: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      wifi: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Lodgings');
  }
};
