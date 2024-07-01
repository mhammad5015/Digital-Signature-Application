"use strict";
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Admins", [
      {
        firstName: "mhammad",
        lastName: "alkhateeb",
        email: "mh@gmail.com",
        password: await bcrypt.hash("1234567890", 12),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "obadah",
        lastName: "abo essa",
        email: "ob@gmail.com",
        password: await bcrypt.hash("1234567890", 12),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
