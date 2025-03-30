'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inquiry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Inquiry.hasOne(models.Quotation, { foreignKey: "inquiryId", onDelete: "CASCADE" });
    }
  }
  Inquiry.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactDetails: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productType: {
      type: DataTypes.ENUM("standard", "non-standard"),
      allowNull: false,
    },
    source: {
      type: DataTypes.ENUM("email", "social media", "verbal"),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "quoted", "confirmed", "closed"),
      defaultValue: "pending",
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Inquiry',
    timestamps: true,
  });
  return Inquiry;
};