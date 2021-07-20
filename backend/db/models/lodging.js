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
  };
  return Lodging;
};
