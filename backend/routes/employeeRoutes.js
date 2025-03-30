const express = require("express");
const { addEmployee, getEmployees, getEmployeeById, getEmployeeProfile, updateEmployee, deleteEmployee } = require("../controllers/employeeController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addEmployee);
router.get("/", authMiddleware, getEmployees);
router.get("/:id", authMiddleware, getEmployeeById);
router.put("/update/:id", authMiddleware, updateEmployee);
router.delete("/delete/:id", authMiddleware, deleteEmployee);

module.exports = router;