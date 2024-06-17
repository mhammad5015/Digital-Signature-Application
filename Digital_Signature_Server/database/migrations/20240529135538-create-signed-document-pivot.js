"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SignedDocumentPivots", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      documentStatus: {
        type: Sequelize.ENUM,
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
    await queryInterface.addColumn("SignedDocumentPivots", "firstPartyId", {
      type: Sequelize.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
    await queryInterface.addColumn("SignedDocumentPivots", "secondPartyId", {
      type: Sequelize.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
    await queryInterface.addColumn("SignedDocumentPivots", "documentId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Document",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("SignedDocumentPivots");
    await queryInterface.removeColumn("SignedDocumentPivots", "firstPartyId");
    await queryInterface.removeColumn("SignedDocumentPivots", "secondPartyId");
    await queryInterface.removeColumn("SignedDocumentPivots", "documentId");
  },
};
