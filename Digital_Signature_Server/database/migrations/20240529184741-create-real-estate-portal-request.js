"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RealEstatePortalRequests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      
      data: {
        type: Sequelize.STRING,
      },
      status: {
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
    await queryInterface.addColumn("RealEstatePortalRequests", "adminId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Admin",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
    await queryInterface.addColumn("RealEstatePortalRequests", "officialId", {
      type: Sequelize.INTEGER,
      references: {
        model: "GovernmentOfficial",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("RealEstatePortalRequests");
    await queryInterface.removeColumn("RealEstatePortalRequests", "adminId");
    await queryInterface.removeColumn("RealEstatePortalRequests", "officialId");
  },
};
