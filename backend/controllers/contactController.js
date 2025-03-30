const { Contact } = require("../models");

const addContact = async (req, res) => {
    try{
        const { name, email, phone, address, city, state, companyName, GSTNumber, contactType } = req.body;

        const contact = await Contact.create({
            name,
            email,
            phone,
            address,
            city,
            state,
            companyName,
            GSTNumber,
            contactType,
        });

        res.status(200).json({ message: "Contact added successfully", contact });
    }catch(error){
        console.error("Failed to add the contact: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getContacts = async (req, res) => {
    try{
        const contacts = await Contact.findAll();
        res.status(200).json(contacts);
    }catch(error){
        console.error("Failed to fetch the contacts: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateContact = async (req, res) => {
    try{
        const { id } = req.params;
        const { name, phone, email, address, city, state, companyName, GSTNumber, contactType } = req.body;

        const contact = await Contact.findByPk(id);
        if(!contact){
            return res.status(404).json({ message: "Contact not found" });
        }

        await contact.update({ name, phone, email, address, city, state, companyName, GSTNumber, contactType });
        res.status(200).json({ message: "Contact updated successfully", contact });
    }catch(error){
        console.error("Failed to update the contact: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteContact = async (req, res) => {
    try{
        const { id } = req.params;

        const contact = await Contact.findByPk(id);
        if(!contact){
            return res.status(404).json({ message: "Contact not found" });
        }

        await contact.destroy();
        res.status(200).json({ message: "Contact deleted successfully" });
    }catch(error){
        console.error("Failed to delete the contact: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    addContact,
    getContacts,
    updateContact,
    deleteContact,
};