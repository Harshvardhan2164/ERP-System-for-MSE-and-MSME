'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    static associate(models) {
      Attendance.belongsTo(models.Employee, { foreignKey: 'employeeId', onDelete: 'CASCADE' });
    }
  }
  Attendance.init({
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Employees', key: 'id' },
    },
    employeeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('present', 'absent', 'leave'),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Attendance',
    timestamps: false,
  });
  return Attendance;
};