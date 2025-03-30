const express = require("express");
const router = express.Router();
const { getAllUsers, updateUserRole, deleteUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, roleMiddleware(["admin"]), getAllUsers);
router.put("/update-role", authMiddleware, roleMiddleware(["admin"]), updateUserRole);
router.delete("/delete/:id", authMiddleware, roleMiddleware(["admin"]), deleteUser);

module.exports = router;