const { Inquiry } = require("../models");

const createInquiry = async (req, res) => {
    try{
        const inquiry = await Inquiry.create(req.body);

        res.status(201).json({ message: "Inquiry created successfully", inquiry });
    }catch (error){
        console.error("Error creating the inquiry: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAllInquiries = async (req, res) => {
    try{
        const inquiries = await Inquiry.findAll();

        res.status(200).json(inquiries);
    }catch(error){
        console.error("Error fetching inquiries: ", error.message);
        req.status(500).json({ message: "Internal server error" });
    }
};

const getInquiryById = async (req, res) => {
    try{
        const inquiry = await Inquiry.findByPk(req.params.id);

        if(!inquiry){
            return res.status(404).json({ message: "Inquiry not found" });
        }

        res.status(200).json(inquiry);
    }catch (error){
        console.error("Error fetching inquiry: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateInquiry = async (req, res) => {
    try{
        const inquiry = await Inquiry.findByPk(req.params.id);

        if(!inquiry){
            return res.status(404).json({ message: "Inquiry not found" });
        }

        await inquiry.update(req.body);
        res.status(200).json({ message: "Inquiry updated successfully" });
    }catch (error){
        console.error("Error updating inquiry: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteInquiry = async (req, res) => {
    try{
        const inquiry = await Inquiry.findByPk(req.params.id);

        if(!inquiry){
            return res.status(404).json({ message: "Inquiry not found" });
        }

        await inquiry.destroy();

        res.status(200).json({ message: "Inquiry deleted successfully" });
    }catch (error){
        console.error("Error deleting inquiry: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createInquiry, getAllInquiries, getInquiryById, updateInquiry, deleteInquiry };