'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FinancialReports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      totalRevenue: {
        type: Sequelize.FLOAT
      },
      totalExpenses: {
        type: Sequelize.FLOAT
      },
      netProfit: {
        type: Sequelize.FLOAT
      },
      month: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATEONLY
      },
      updatedAt: {
        type: Sequelize.DATEONLY
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FinancialReports');
  }
};