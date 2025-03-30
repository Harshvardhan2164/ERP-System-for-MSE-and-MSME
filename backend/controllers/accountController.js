const { Expense, Revenue, FinancialReport } = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");

// Add an expense
const addExpense = async (req, res) => {
  try {
    const { category, amount, description, date } = req.body;
    const expense = await Expense.create({ category, amount, description, date });
    res.status(201).json({ message: "Expense added successfully", expense });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all expenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add revenue
const addRevenue = async (req, res) => {
  try {
    const { source, amount, description, date } = req.body;
    const revenue = await Revenue.create({ source, amount, description, date });
    res.status(201).json({ message: "Revenue recorded successfully", revenue });
  } catch (error) {
    console.error("Error adding revenue:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all revenues
const getRevenues = async (req, res) => {
  try {
    const revenues = await Revenue.findAll();
    res.status(200).json(revenues);
  } catch (error) {
    console.error("Error fetching revenues:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Generate financial report
const generateFinancialReport = async (req, res) => {
  try {
    const { month } = req.body;

    if (!moment(month, "YYYY-MM", true).isValid()) {
      return res.status(400).json({ message: "Invalid month format. Use YYYY-MM." });
    }

    const startDate = moment(month, "YYYY-MM").startOf("month").format("YYYY-MM-DD");
    const endDate = moment(month, "YYYY-MM").endOf("month").format("YYYY-MM-DD");

    const totalRevenue = await Revenue.sum("amount", { where: { date: { [Op.between]: [startDate, endDate] } } });
    const totalExpenses = await Expense.sum("amount", { where: { date: { [Op.between]: [startDate, endDate] } } });
    const netProfit = totalRevenue - totalExpenses;

    const report = await FinancialReport.create({ totalRevenue, totalExpenses, netProfit, month });

    res.status(201).json({ message: "Financial report generated successfully", report });
  } catch (error) {
    console.error("Error generating financial report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addExpense, getExpenses, addRevenue, getRevenues, generateFinancialReport };