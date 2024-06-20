'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PublicKey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PublicKey.init({
    publicKey: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'PublicKey',
  });
  return PublicKey;
};