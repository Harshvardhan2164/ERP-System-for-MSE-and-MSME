const { Inquiry, Quotation, Product } = require("../models");

const createQuotation = async (req, res) => {
    try{
        const { inquiryId, items, totalAmount, status } = req.body;

        const inquiry = await Inquiry.findByPk(inquiryId);

        if(!inquiry){
            return res.status(404).json({ message: "Inquiry not found for quotation" });
        }

        const itemsWithProductNames = await Promise.all(
            items.map(async (item) => {
              const product = await Product.findOne({ where: { productCode: item.itemCode } });
              return {
                itemCode: item.itemCode,
                productName: product ? product.name : "Unknown Product",
                quantity: item.quantity,
                price: item.price,
              };
            })
          );

        const quotation = await Quotation.create({
            inquiryId,
            customerName: inquiry.customerName,
            items: itemsWithProductNames,
            productType: inquiry.productType,
            totalAmount,
            status
        });

        res.status(201).json({ message: "Quotation created successfully", quotation });
    }catch (error){
        console.error("Error creating the quotation: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAllQuotations = async (req, res) => {
    try{
        const quotations = await Quotation.findAll();

        res.status(200).json(quotations);
    }catch (error){
        console.error("Error fetching quotations: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getQuotationById = async (req, res) => {
    try{
        const quotation = await Quotation.findByPk(req.params.id);

        if(!quotation){
            return res.status(404).json({ message: "Quotation not found" });
        }

        res.status(200).json(quotation);
    }catch (error){
        console.error("Error fetching the qoutation: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateQuotation = async (req, res) => {
    try{
        const quotation = await Quotation.findByPk(req.params.id);

        if(!quotation){
            return res.status(404).json({ message: "Quotation not found" });
        }

        await quotation.update(req.body);

        res.status(200).json({ message: "Quotation updated successfully" });
    }catch (error){
        console.error("Error updating quotation: ", error.message);
        res.status(500).json({ message: "internal server error" });
    }
};

const deleteQuotation = async (req, res) => {
    try{
        const quotation = await Quotation.findByPk(req.params.id);

        if(!quotation){
            return res.status(404).json({ message: "Quotation not found" });
        }

        await quotation.destroy();

        res.status(200).json({ message: "Quotation deleted successfully" });
    }catch (error){
        console.error("Error deleting quotation: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createQuotation, getAllQuotations, getQuotationById, updateQuotation, deleteQuotation };