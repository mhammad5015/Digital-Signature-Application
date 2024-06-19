"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DigitalCertificates", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
        allowNull: false,
      },
      version: {
        type: Sequelize.STRING,
      },
      serialNumber: {
        type: Sequelize.INTEGER,
      },
      signatureAlgorithm: {
        type: Sequelize.STRING,
      },
      issuer: {
        type: Sequelize.STRING,
      },
      validatePeriod: {
        type: Sequelize.DATE,
      },
      subject: {
        type: Sequelize.STRING,
      },
      ca_signature: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("DigitalCertificates");
  },
};
