"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RealEstatePortalRequest extends Model {
    static associate(models) {
      this.belongsTo(models.Admin, { foreignKey: 'adminId' });
      this.belongsTo(models.GovernmentOfficial, { foreignKey: 'officialId' });
    }
  }
  RealEstatePortalRequest.init(
    {
      name: DataTypes.STRING,
      data: DataTypes.STRING,
      status: DataTypes.ENUM("pending", "approved", "rejected"),
    },
    {
      sequelize,
      modelName: "RealEstatePortalRequest",
    }
  );
  return RealEstatePortalRequest;
};
