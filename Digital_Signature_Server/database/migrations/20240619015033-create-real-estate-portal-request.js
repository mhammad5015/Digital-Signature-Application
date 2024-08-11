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
      admin_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Admins",
          },
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
      governmentOfficial_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Admins",
          },
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reqStatus: {
        // fill it as you want
        type: Sequelize.ENUM("pending", "approved", "rejected"),
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
    await queryInterface.dropTable("RealEstatePortalRequests");
  },
};
