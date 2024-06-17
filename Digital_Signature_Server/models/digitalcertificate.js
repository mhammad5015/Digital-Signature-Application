"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DigitalCertificate extends Model {
    static associate(models) {
      this.belongsTo(models.User);
    }
  }
  DigitalCertificate.init(
    {
      version: DataTypes.STRING,
      serialNumber: DataTypes.INTEGER,
      signatureAlgorithm: DataTypes.STRING,
      issuer: DataTypes.STRING,
      validityPeriod: DataTypes.DATE,
      subject: DataTypes.STRING,
      CA_Signature: DataTypes.BLOB("long"),
    },
    {
      sequelize,
      modelName: "DigitalCertificate",
    }
  );
  return DigitalCertificate;
};
