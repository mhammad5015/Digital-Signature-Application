"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PublicKey extends Model {
    static associate(models) {
      this.belongsTo(models.User);
    }
  }
  PublicKey.init(
    {
      publicKey: DataTypes.BLOB("long"),
    },
    {
      sequelize,
      modelName: "PublicKey",
    }
  );
  return PublicKey;
};
