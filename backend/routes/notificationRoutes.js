const express = require("express");
const { getEmployeeNotifications } = require("../controllers/notificationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/notify/:id", authMiddleware, getEmployeeNotifications);

module.exports = router;
