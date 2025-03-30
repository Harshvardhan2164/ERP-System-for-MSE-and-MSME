const { Invoice, Order, OrderItem } = require("../models");

// Generate an invoice for an order
const generateInvoice = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Validate order
    const order = await Order.findByPk(orderId, {
      include: [{ model: OrderItem }],
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Create invoice
    const invoice = await Invoice.create({
      orderId,
      totalAmount: order.totalAmount,
      status: order.paymentStatus,
    });

    res.status(201).json({ message: "Invoice generated", invoice });
  } catch (error) {
    console.error("Error generating invoice:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all invoices
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll({ include: [{ model: Order }] });
    res.status(200).json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { generateInvoice, getInvoices };