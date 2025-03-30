const { Leave, Employee, Notification } = require("../models");

// Apply for leave
const applyLeave = async (req, res) => {
  try {
    const { employeeId, startDate, endDate, reason, status } = req.body;

    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const leave = await Leave.create({
      employeeId,
      employeeName: employee.name,
      startDate,
      endDate,
      reason,
      status: status || "pending",
    });

    res.status(201).json({ message: "Leave request submitted", leave });
  } catch (error) {
    console.error("Error applying for leave:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateLeaveStatus = async (req, res) => {
  try{
    const { id, status } = req.body;

    const leave = await Leave.findByPk(id);
    if(!leave){
      return res.status(404).json({ message: "Employee leave request not found" });
    }

    leave.status = status;
    await leave.save();

    const start_date = leave.startDate ? new Date(leave.startDate).toISOString().split('T')[0] : "Unknown";
    const end_date = leave.endDate ? new Date(leave.endDate).toISOString().split('T')[0] : "Unknown";

    await Notification.create({
      employeeId: leave.employeeId,
      message: `Your leave request from ${start_date} to ${end_date} has been ${status}`,
      status: 'read',
    });

    res.status(200).json({ message: "Leave status updated" });
  } catch (error){
    console.error("Error updating the status of leave: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all leave records
const getLeaveRecords = async (req, res) => {
  try {
    const records = await Leave.findAll();
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching leave records:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getLeaveRecordsByID = async (req, res) => {
  try{
    const employeeId = parseInt(req.params.id, 10);
    const leaves = await Leave.findAll({ where: { employeeId } });

    if(!leaves){
      res.status(404).json({ message: "No leave records found" });
    }

    res.status(200).json(leaves);
  } catch(error){
      console.error("Error fetching leave records: ", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { applyLeave, updateLeaveStatus, getLeaveRecords, getLeaveRecordsByID };