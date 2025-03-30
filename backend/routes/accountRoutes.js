const express = require("express");
const {
  addExpense,
  getExpenses,
  addRevenue,
  getRevenues,
  generateFinancialReport,
} = require("../controllers/accountController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Expense routes
router.post("/expenses/add", authMiddleware, addExpense);
router.get("/expenses/", authMiddleware, getExpenses);

// Revenue routes
router.post("/revenues/add", authMiddleware, addRevenue);
router.get("/revenues/", authMiddleware, getRevenues);

// Financial report route
router.post("/financial-report/generate", authMiddleware, generateFinancialReport);

module.exports = router;