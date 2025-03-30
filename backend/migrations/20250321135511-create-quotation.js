'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Quotations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      inquiryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Inquiries",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      customerName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quotationDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      productType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      items: {
        type: Sequelize.JSON,
        allowNull: false
      },
      totalAmount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Quotations');
  }
};