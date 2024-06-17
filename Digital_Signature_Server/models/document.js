"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    static associate(models) {
      this.belongsTo(models.User);
      this.belongsToMany(models.User, {
        through: models.SignedDocumentPivot,
        foreignKey: "documentId",
        otherKey: "firstPartyId",
      });
      this.belongsToMany(models.User, {
        through: models.SignedDocumentPivot,
        foreignKey: "documentId",
        otherKey: "secondPartyId",
      });
    }
  }
  Document.init(
    {
      file: DataTypes.BLOB("long"),
      fileName: DataTypes.STRING,
      fileType: DataTypes.ENUM(
        "pdf",
        "docs",
        "txt",
        "png",
        "jpg",
        "jpeg",
        "tiff"
      ),
      status: DataTypes.ENUM("inbox", "draft", "sent", "deleted"),
    },
    {
      sequelize,
      modelName: "Document",
    }
  );
  return Document;
};
