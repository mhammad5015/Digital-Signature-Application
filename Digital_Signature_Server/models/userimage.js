"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserImage extends Model {
    static associate(models) {
      this.belongsTo(models.User);
    }
  }
  UserImage.init(
    {
      imageType: DataTypes.ENUM("front", "back"),
      imageData: DataTypes.BLOB("long"),
    },
    {
      sequelize,
      modelName: "UserImage",
    }
  );
  return UserImage;
};
