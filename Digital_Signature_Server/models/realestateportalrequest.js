'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RealEstatePortalRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RealEstatePortalRequest.init({
    name: DataTypes.STRING,
    data: DataTypes.STRING,
    reqStatus: DataTypes.ENUM("pending", "approved", "rejected")
  }, {
    sequelize,
    modelName: 'RealEstatePortalRequest',
  });
  return RealEstatePortalRequest;
};