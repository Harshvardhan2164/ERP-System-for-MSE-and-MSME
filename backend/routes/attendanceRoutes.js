const express = require("express");
const { markAttendance, getAttendanceRecords } = require("../controllers/attendanceController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/mark", authMiddleware, markAttendance);
router.get("/", authMiddleware, getAttendanceRecords);

module.exports = router;