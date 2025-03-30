const express = require("express");
const { addContact, getContacts, updateContact, deleteContact } = require("../controllers/contactController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addContact);
router.get("/", authMiddleware, getContacts);
router.put("/update/:id", authMiddleware, updateContact);
router.delete("/delete/:id", authMiddleware, deleteContact);

module.exports = router;