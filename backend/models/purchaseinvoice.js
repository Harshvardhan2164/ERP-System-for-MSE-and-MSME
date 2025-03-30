'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchaseInvoice extends Model {
    static associate(models) {
      PurchaseInvoice.belongsTo(models.PurchaseOrder, { foreignKey: "orderId", onDelete: "CASCADE" });
    }
  }
  PurchaseInvoice.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "PurchaseOrders",
        key: "id",
      },
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.ENUM("pending", "paid", "failed"),
      allowNull: false,
      defaultValue: "pending",
    },
  }, {
    sequelize,
    modelName: 'PurchaseInvoice',
    timestamps: true,
  });
  return PurchaseInvoice;
};