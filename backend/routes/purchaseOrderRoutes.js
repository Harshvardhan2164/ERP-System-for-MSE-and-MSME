const express = require("express");
const { createOrder, getOrders, getOrderById, updateOrderStatus, deleteOrder } = require("../controllers/purchaseOrderController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createOrder);
router.get("/", authMiddleware, getOrders);
router.get("/:id", authMiddleware, getOrderById);
router.put("/:id/status", authMiddleware, updateOrderStatus);
router.delete("/delete/:id", authMiddleware, deleteOrder);

module.exports = router;