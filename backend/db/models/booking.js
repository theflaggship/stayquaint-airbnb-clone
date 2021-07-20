'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    userId: DataTypes.INTEGER,
    lodgingId: DataTypes.INTEGER,
    dateStart: DataTypes.DATEONLY,
    dateEnd: DataTypes.DATEONLY
  }, {});
  Booking.associate = function(models) {
    // associations can be defined here
    Booking.belongsTo(models.User, {foreignKey: 'userId'});
    Booking.belongsTo(models.Lodging, {foreignKey: 'lodgingId'});
  };
  return Booking;
};
