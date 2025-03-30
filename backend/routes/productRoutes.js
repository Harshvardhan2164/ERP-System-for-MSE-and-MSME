const express = require("express");
const { addProduct, getProducts, getProductById, updateProduct, deleteProduct, getLowStockAlerts } = require("../controllers/productController");
const authMiddleware  = require("../middleware/authMiddleware");

const router = express.Router();

// Product routes
router.post("/add", authMiddleware, addProduct);        // Add a product
router.get("/", authMiddleware, getProducts);       // Get all products
router.get("/:id", authMiddleware, getProductById); // Get a single product
router.put("/update/:id", authMiddleware, updateProduct);  // Update a product
router.delete("/delete/:id", authMiddleware, deleteProduct); // Delete a product
router.get("/low-stock/alerts", authMiddleware, getLowStockAlerts); // Get low stock alerts

module.exports = router;