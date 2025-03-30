'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.hasOne(models.Invoice, { foreignKey: "orderId", onDelete: "CASCADE" });
      Order.belongsTo(models.Quotation, { foreignKey: "quotationId", onDelete: "SET NULL" });
    }
  }
  Order.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    quotationId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "Quotations",
        key: "id",
      },
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderItems: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "shipped", "delivered", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
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
    modelName: 'Order',
    timestamps: true,
  });
  return Order;
};