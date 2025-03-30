const { Attendance, Employee } = require("../models");

// Mark employee attendance
const markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    // Ensure employee exists
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const attendance = await Attendance.create({
      employeeId,
      employeeName: employee.name,
      date,
      status,
    });

    res.status(201).json({ message: "Attendance marked successfully", attendance });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all attendance records
const getAttendanceRecords = async (req, res) => {
  try {
    const records = await Attendance.findAll();
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { markAttendance, getAttendanceRecords };