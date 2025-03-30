const { where } = require("sequelize");
const { Order, Quotation, Product } = require("../models");

const createOrder = async (req, res) => {
  try {
    const { quotationId, paymentStatus, status } = req.body;

    const quotation = await Quotation.findByPk(quotationId);
    if(!quotation){
      return res.status(404).json({ message: "Quotation not found" });
    }
    
    let orderItems = quotation.items;
    
    
    const itemsWithProductNames = await Promise.all(
      orderItems.map(async (item) => {
        const product = await Product.findOne({ where: { productCode: item.itemCode } });
        return {
          itemCode: item.itemCode,
          productName: product ? product.name : "Not available in the inventory",
          quantity: item.quantity,
          price: item.price,
        };
      })
    );
    
    const newOrder = await Order.create({
      quotationId,
      customerName: quotation.customerName,
      orderItems: itemsWithProductNames,
      totalAmount: quotation.totalAmount,
      paymentStatus,
      status,
    });
    
    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createNewOrder = async (req, res) => {
  try{
    const { customerName, orderItems, totalAmount, paymentStatus, status } = req.body;
    
    const itemsWithProductNames = await Promise.all(
      orderItems.map(async (item) => {
        const product = await Product.findOne({ where: { productCode: item.itemCode } });
        return {
          itemCode: item.itemCode,
          productName: product ? product.name : "Unknown Product",
          quantity: item.quantity,
          price: item.price,
        };
      })
    );
    
    const newOrder = await Order.create({
      customerName,
      totalAmount,
      orderItems: itemsWithProductNames,
      paymentStatus,
      status,
    });
    
    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { quotationId, customerName, orderItems, totalAmount, status, paymentStatus } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.quotationId = quotationId;
    order.customerName = customerName;
    order.orderItems = orderItems;
    order.totalAmount = totalAmount;
    order.status = status;
    order.paymentStatus = paymentStatus;
    await order.save();

    res.status(200).json({ message: "Order Details updated", order });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.destroy();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createOrder, createNewOrder, getOrders, getOrderById, updateOrderStatus, deleteOrder };