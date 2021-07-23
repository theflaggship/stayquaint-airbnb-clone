'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lodging = sequelize.define('Lodging', {
    name: DataTypes.STRING,
    addressId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    categoryId: DataTypes.INTEGER,
    breakfast: DataTypes.BOOLEAN,
    pool: DataTypes.BOOLEAN,
    wifi: DataTypes.BOOLEAN
  }, {});
  Lodging.associate = function(models) {
    // associations can be defined here
    Lodging.belongsTo(models.Address, {foreignKey: 'addressId', onDelete: 'cascade'});
    Lodging.belongsTo(models.User, {foreignKey: 'userId'});
    Lodging.belongsTo(models.Category, {foreignKey: 'categoryId'});
    Lodging.hasMany(models.Review, {foreignKey: 'lodgingId'});
    Lodging.hasMany(models.Booking, {foreignKey: 'lodgingId'});
    Lodging.hasMany(models.Image, {foreignKey: 'lodgingId', onDelete: 'cascade' });
  };
  return Lodging;
};
