const express = require("express");
const { applyLeave, updateLeaveStatus, getLeaveRecords, getLeaveRecordsByID } = require("../controllers/leaveController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/apply", authMiddleware, applyLeave);
router.put("/update", authMiddleware, updateLeaveStatus);
router.get("/:id", authMiddleware, getLeaveRecordsByID);
router.get("/", authMiddleware, getLeaveRecords);

module.exports = router;