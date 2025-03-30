'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quotation extends Model {
    static associate(models) {
      Quotation.belongsTo(models.Inquiry, { foreignKey: "inquiryId", onDelete: "SET NULL" });
    }
  }
  Quotation.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    inquiryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Inquiries",
        key: "id",
      },
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quotationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    productType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    items: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      allowNull: false,
      defaultValue: "pending",
    }
  }, {
    sequelize,
    modelName: 'Quotation',
    timestamps: false,
  });
  return Quotation;
};