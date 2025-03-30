import { useState, useEffect, useContext } from "react";
import API from "../utils/api";

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: 0,
        address: "",
        city: "",
        state: "",
        GSTNumber: "",
        companyName: "",
        contactType: "",
    });
    const [editingContact, setEditingContact] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try{
            const response = await API.get("/api/contacts/");
            setContacts(response.data);
        } catch(error){
            console.error("Error fetching contacts: ", error.response?.data?.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(editingContact){
                await API.put(`/api/contacts/update/${editingContact.id}`, formData);
                alert("Contact updated successfully!");
            }
            else{
                await API.post("/api/contacts/add", formData);
                alert("Contact added successfully!");
            }

            setShowForm(false);
            setFormData({ name: "", email: "", phone: "", address: "", city: "", state: "", companyName: "", contactType: "" });
            setEditingContact(null);
            fetchContacts();
        } catch(error){
            console.error("Error adding/updating contact: ", error.response?.data?.message);
        }
    };

    const handleEdit = (contact) => {
        setEditingContact(contact);
        setFormData(contact);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if(!window.confirm("Are you sure, you want to delete this contact?")) return;
        try{
            await API.delete(`/api/contacts/delete/${id}`);
            fetchContacts();
            alert("Contact deleted successfully!");
        } catch(error){
            console.error("Error deleting contact: ", error.response?.data?.message);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-semibold text-white mb-6">Contact Management</h2>

            <button
                onClick={() => {
                    setEditingContact(null);
                    setFormData({
                        name: "",
                        email: "",
                        phone: 0,
                        address: "",
                        city: "",
                        state: "",
                        GSTNumber: "",
                        companyName: "",
                        contactType: "",
                    });
                    setShowForm(true);
                }}
                className="w-full p-3 bg-green-500 px-4 py-2 rounded-md text-white font-semibold hover:bg-green-600 transition-all"
            >
                Add Contact
            </button>

            {showForm && (
                <div className="mt-4 p-4 border border-gray-500">
                    <h3 className="text-xl font-semibold text-white">{editingContact ? "Update Contact" : "Create Contact"}</h3>

                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600" required />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600" required />
                    <input type="number" name="phone" placeholder="Phone" value={formData.phone === 0 ? "" : formData.phone} onChange={handleChange} className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600" required />
                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600" required />
                    <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600" required />
                    <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600" required />
                    <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600" required />
                    <input type="text" name="GSTNumber" placeholder="GST Number" value={formData.GSTNumber} onChange={handleChange} className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600" required />
                    <input type="text" name="contactType" placeholder="Contact Type" value={formData.contactType} onChange={handleChange} className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600" required />

                    <button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 mt-6">
                    {editingContact ? "Update" : "Add"}
                    </button>

                    <button onClick={() => setShowForm(false)} className="bg-red-500 text-white w-full px-4 py-2 mt-2 rounded font-semibold hover:bg-red-600 transition-all">
                        Close
                    </button>
                </div>
            )}

            <table className="min-w-full border-collapse border border-gray-300 mt-6">
                <thead>
                <tr className="bg-gray-900">
                    <th className="border border-gray-700 p-3">ID</th>
                    <th className="border border-gray-700 p-3">Name</th>
                    <th className="border border-gray-700 p-3">Email</th>
                    <th className="border border-gray-700 p-3">Phone</th>
                    <th className="border border-gray-700 p-3">Address</th>
                    <th className="border border-gray-700 p-3">City</th>
                    <th className="border border-gray-700 p-3">State</th>
                    <th className="border border-gray-700 p-3">Company Name</th>
                    <th className="border border-gray-700 p-3">Contact Type</th>
                    <th className="border border-gray-700 p-3">Actions</th>
                </tr>
                </thead>
                <tbody>
                {contacts.map((cont) => (
                    <tr key={cont.id} className="border">
                    <td className="border border-gray-700 p-3">{cont.id}</td>
                    <td className="border border-gray-700 p-3">{cont.name}</td>
                    <td className="border border-gray-700 p-3">{cont.email}</td>
                    <td className="border border-gray-700 p-3">{cont.phone}</td>
                    <td className="border border-gray-700 p-3">{cont.address}</td>
                    <td className="border border-gray-700 p-3">{cont.city}</td>
                    <td className="border border-gray-700 p-3">{cont.state}</td>
                    <td className="border border-gray-700 p-3">{cont.companyName}</td>
                    <td className="border border-gray-700 p-3">{cont.contactType}</td>
                    <td className="border border-gray-700 p-3">
                        <button onClick={() => handleEdit(cont)} className="bg-yellow-500 text-white px-3 rounded hover:bg-yellow-600 py-1 mr-2">Edit</button>
                        <button onClick={() => handleDelete(cont.id)} className="bg-red-500 text-white px-3 rounded hover:bg-red-600 py-1">Delete</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Contacts;