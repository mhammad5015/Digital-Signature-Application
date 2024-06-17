"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasOne(models.DigitalCertificate);
      this.hasMany(models.UserImage);
      this.hasMany(models.Document);
      this.hasOne(models.PublicKey);
      this.belongsToMany(models.Document, {
        through: models.SignedDocumentPivot,
        foreignKey: "firstPartyId",
        otherKey: "documentId",
      });
      this.belongsToMany(models.Document, {
        through: models.SignedDocumentPivot,
        foreignKey: "secondPartyId",
        otherKey: "documentId",
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      middleName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      organization: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
