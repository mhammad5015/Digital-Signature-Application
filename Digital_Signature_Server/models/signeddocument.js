'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SignedDocument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SignedDocument.hasMany(models.VariousParties, {foreignKey: 'signedDocument_id'})
    }
  }
  SignedDocument.init({
    signingStatus: DataTypes.ENUM("pending", "processing", "completed")
  }, {
    sequelize,
    modelName: 'SignedDocument',
  });
  return SignedDocument;
};