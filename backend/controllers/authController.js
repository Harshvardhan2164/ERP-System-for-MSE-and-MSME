const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { body, validationResult } = require("express-validator");

const registerUser = async (req, res) => {
  try {
    // Input Validation
    await body("name").notEmpty().withMessage("Name is required").run(req);
    await body("email").isEmail().withMessage("Valid email is required").run(req);
    await body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters").run(req);
    await body("role").optional().isIn(["admin", "manager", "employee", "accountant"]).withMessage("Invalid role").run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({ name, email, password, role });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    // Input Validation
    await body("email").isEmail().withMessage("Valid email is required").run(req);
    await body("password").notEmpty().withMessage("Password is required").run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match status:", isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const forgetPassword = async (req, res) => {
  try{
    await body("email").isEmail().run(req);
    await body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters").run(req);
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if(!user){
      return res.status(404).json({ message: "User not found" });
    }

    await user.update({ password: password });

    res.status(201).json({ message: "Password updated Successfully" });

  } catch(error){
    console.error("Error updating the password: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerUser, loginUser, forgetPassword };