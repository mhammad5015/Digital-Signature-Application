"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Documents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fileName: {
        type: Sequelize.STRING,
      },
      file: {
        type: Sequelize.TEXT,
      },
      fileType: {
        type: Sequelize.ENUM(
          "pdf",
          "docs",
          "txt",
          "png",
          "jpg",
          "jpeg",
          "tiff"
        ),
      },
      // status: {
      //   type: Sequelize.ENUM("inbox", "draft", "sent", "deleted"),
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Documents");
  },
};
