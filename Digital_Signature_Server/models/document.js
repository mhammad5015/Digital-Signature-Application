'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Document.init({
    fileName: DataTypes.STRING,
    file: DataTypes.TEXT,
    fileType: DataTypes.ENUM,
    // status: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'Document',
  });
  return Document;
};