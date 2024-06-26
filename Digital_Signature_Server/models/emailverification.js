"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmailVerification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  EmailVerification.init(
    {
      verificationCode: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "EmailVerification",
    }
  );
  return EmailVerification;
};
