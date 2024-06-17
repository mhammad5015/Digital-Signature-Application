"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GovernmentOfficial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Admin, {
        through: models.RealEstatePortalRequest,
        foreignKey: "officialId",
        otherKey: "adminId",
      });
    }
  }
  GovernmentOfficial.init(
    {
      firstName: DataTypes.STRING,
      middleName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING(64),
      validate: {
        isEmail: true,
        notEmpty: true,
        unique: true,
      },
      password: DataTypes.STRING(64),
      validate: {
        is: /^[0-9a-f]{64}$/i,
      },
    },
    {
      sequelize,
      modelName: "GovernmentOfficial",
    }
  );
  return GovernmentOfficial;
};
