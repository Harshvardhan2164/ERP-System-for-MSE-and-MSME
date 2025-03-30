const express = require("express");
const { processPayroll, getPayrollRecords } = require("../controllers/payrollController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/pay", authMiddleware, processPayroll);
router.get("/", authMiddleware, getPayrollRecords);

module.exports = router;