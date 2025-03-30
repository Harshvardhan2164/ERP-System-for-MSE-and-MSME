'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.hasMany(models.Attendance, { foreignKey: 'employeeId', onDelete: 'CASCADE' });
      Employee.hasMany(models.Leave, { foreignKey: 'employeeId', onDelete: 'CASCADE' });
      Employee.hasOne(models.Payroll, { foreignKey: 'employeeId', onDelete: 'CASCADE' });
    }
  }
  Employee.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Employee',
    timestamps: true,
  });
  return Employee;
};