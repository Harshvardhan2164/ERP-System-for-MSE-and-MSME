const { Product, sequelize } = require("../models");
const { Op } = require("sequelize");

// Add a new product
const addProduct = async (req, res) => {
  try {
    const { name, category, quantity, price, productCode, lowStockThreshold } = req.body;

    const product = await Product.create({ name, category, quantity, price, productCode, lowStockThreshold });

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update product details
const updateProduct = async (req, res) => {
  try {
    const { name, category, quantity, price, productCode, lowStockThreshold } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.update({ name, category, quantity, price, productCode, lowStockThreshold });
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get low stock alerts
const getLowStockAlerts = async (req, res) => {
  try {
    const lowStockProducts = await Product.findAll({
      where: {
        quantity: {
          [Op.lte]: sequelize.col("lowStockThreshold"),
        },
      },
    });

    res.status(200).json({ message: "Low stock products", lowStockProducts });
  } catch (error) {
    console.error("Error fetching low stock alerts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addProduct, getProducts, getProductById, updateProduct, deleteProduct, getLowStockAlerts };