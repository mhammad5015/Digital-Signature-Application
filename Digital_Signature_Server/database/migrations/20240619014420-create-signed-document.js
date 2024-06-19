"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SignedDocuments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      document_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Documents",
          },
          key: "id",
        },
        allowNull: false,
      },
      signingStatus: {
        // fill it
        type: Sequelize.ENUM('pending', 'processing', 'completed'),
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("SignedDocuments");
  },
};
