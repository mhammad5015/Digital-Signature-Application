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
      file: {
        type: Sequelize.BLOB("long"),
      },
      fileName: {
        type: Sequelize.STRING,
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
      status: {
        type: Sequelize.ENUM("inbox", "draft", "sent", "deleted"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addColumn("Documents", "UserId", {
      type: Sequelize.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Documents");
    await queryInterface.removeColumn("Documents", "UserId");
  },
};
