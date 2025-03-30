const express = require("express");
const { generateInvoice, getInvoices } = require("../controllers/invoiceController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate", authMiddleware, generateInvoice);
router.get("/", authMiddleware, getInvoices);

module.exports = router;