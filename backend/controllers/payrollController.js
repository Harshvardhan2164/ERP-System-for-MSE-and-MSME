const { Payroll, Employee } = require("../models");

// Process payroll
const processPayroll = async (req, res) => {
  try {
    const { employeeId, salary, bonus, deductions, paymentDate } = req.body;

    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const netPay = parseFloat(salary) + parseFloat(bonus) - parseFloat(deductions);

    const payroll = await Payroll.create({
      employeeId,
      employeeName: employee.name,
      salary,
      bonus,
      deductions,
      netPay,
      paymentDate,
    });

    res.status(201).json({ message: "Payroll processed successfully", payroll });
  } catch (error) {
    console.error("Error processing payroll:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all payroll records
const getPayrollRecords = async (req, res) => {
  try {
    const records = await Payroll.findAll();
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching payroll records:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { processPayroll, getPayrollRecords };