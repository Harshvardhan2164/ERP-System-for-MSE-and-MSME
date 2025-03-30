'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payrolls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employeeId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      employeeName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      salary: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      bonus: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      deductions: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      netPay: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      paymentDate: {
        allowNull: false,
        type: Sequelize.DATEONLY
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payrolls');
  }
};