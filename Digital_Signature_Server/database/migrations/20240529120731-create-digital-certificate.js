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
      validityPeriod: {
        type: Sequelize.DATE,
      },
      subject: {
        type: Sequelize.STRING,
      },
      CA_Signature: {
        type: Sequelize.BLOB("long"),
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
    await queryInterface.addColumn("DigitalCertificates", "UserId", {
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
    await queryInterface.dropTable("DigitalCertificates");
    await queryInterface.removeColumn("DigitalCertificates", "UserId");
  },
};
