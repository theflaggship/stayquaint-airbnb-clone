'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    addressLineOne: DataTypes.STRING,
    addressLineTwo: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    postalCode: DataTypes.INTEGER,
    country: DataTypes.STRING
  }, {});
  Address.associate = function(models) {
    // associations can be defined here
    Address.hasMany(models.Lodging, {foreignKey: 'addressId', onDelete: 'cascade' });
  };
  return Address;
};
