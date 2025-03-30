'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payroll extends Model {
    static associate(models) {
      Payroll.belongsTo(models.Employee, { foreignKey: 'employeeId', onDelete: 'CASCADE' });
    }
  }
  Payroll.init({
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Employees', key: 'id' },
    },
    employeeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    bonus: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    deductions: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    netPay: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Payroll',
    timestamps: false,
  });
  return Payroll;
};