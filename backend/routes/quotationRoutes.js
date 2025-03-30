const express = require("express");
const { createQuotation, getAllQuotations, getQuotationById, updateQuotation, deleteQuotation } = require("../controllers/quotationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createQuotation);
router.get("/", authMiddleware, getAllQuotations);
router.get("/:id", authMiddleware, getQuotationById);
router.put("/update/:id", authMiddleware, updateQuotation);
router.delete("/delete/:id", authMiddleware, deleteQuotation);

module.exports = router;