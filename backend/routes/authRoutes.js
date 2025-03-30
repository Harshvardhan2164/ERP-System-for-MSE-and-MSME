const express = require("express");
const { registerUser, loginUser, forgetPassword } = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot", forgetPassword);

module.exports = router;