const express = require("express");
const { createOrder, createNewOrder, getOrders, getOrderById, updateOrderStatus, deleteOrder } = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createOrder);
router.post("/create-new", authMiddleware, createNewOrder);
router.get("/", authMiddleware, getOrders);
router.get("/:id", authMiddleware, getOrderById);
router.put("/:id/status", authMiddleware, updateOrderStatus);
router.delete("/delete/:id", authMiddleware, deleteOrder);

module.exports = router;