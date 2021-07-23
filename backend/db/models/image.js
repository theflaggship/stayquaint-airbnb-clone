'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    imgUrl: DataTypes.TEXT,
    lodgingId: DataTypes.INTEGER
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsTo(models.Lodging, {foreignKey: 'lodgingId', onDelete: 'CASCADE' });
  };
  return Image;
};
