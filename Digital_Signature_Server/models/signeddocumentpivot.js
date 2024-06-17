'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SignedDocumentPivot extends Model {
    
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'firstPartyId' });
      this.belongsTo(models.User, { foreignKey: 'secondPartyId' });
      this.belongsTo(models.Document, { foreignKey: 'documentId' });
    }
  }
  SignedDocumentPivot.init({
    documentStatus: DataTypes.ENUM('completed','action required','waiting for others','expiring soon','authentication failed'),
    timeOfSigning:DataTypes.DATE
  }, {
    sequelize,
    modelName: 'SignedDocumentPivot',
  });
  return SignedDocumentPivot;
};