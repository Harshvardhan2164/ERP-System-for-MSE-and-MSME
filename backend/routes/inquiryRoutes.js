const express = require("express");
const { createInquiry, getAllInquiries, getInquiryById, updateInquiry, deleteInquiry } = require("../controllers/inquiryController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createInquiry);
router.get("/", authMiddleware, getAllInquiries);
router.get("/:id", authMiddleware, getInquiryById);
router.put("/update/:id", authMiddleware, updateInquiry);
router.delete("/delete/:id", authMiddleware, deleteInquiry);

module.exports = router;