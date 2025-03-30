'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FinancialReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FinancialReport.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    totalRevenue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalExpenses: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    netProfit: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    month: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'FinancialReport',
    timestamps: true,
  });
  return FinancialReport;
};