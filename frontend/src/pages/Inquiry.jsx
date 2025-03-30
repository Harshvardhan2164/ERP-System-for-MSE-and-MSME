import { useState, useEffect } from "react";
import API from "../utils/api";

const Inquiry = () => {
    const [inquiries, setInquiry] = useState([]);
    const [inquiryForm, setInquiryForm] = useState({
        customerName: "",
        contactDetails: "",
        productType: "standard",
        source: "email",
        description: "",
        status: "pending",
    });
    const [editingInquiry, setEditingInquiry] = useState(null);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showInquiryDetails, setShowInquiryDetails] = useState(false);

    useEffect(() => {
        fetchInquiries();
    },[]);

    const fetchInquiries = async () => {
        try{
            const response = await API.get("/api/inquiries/");
            setInquiry(response.data);
        }catch (error){
            console.error("Error fetching inquiries: ", error.response?.data?.message);
        }
    };

    const viewInquiryDetails = async (id) => {
        try{
            const response = await API.get(`/api/inquiries/${id}`);
            setSelectedInquiry(response.data);
            setShowInquiryDetails(true);
        }catch (error){
            console.error("Error fetching inquiry: ", error.response?.data?.message);   
        }
    };

    const handleInquiryInputChange = (e) => {
        const { name, value } = e.target;
        setInquiryForm({ ...inquiryForm, [name]: value });
    };

    const submitInquiry = async () => {
        try{
            if(editingInquiry){
                await API.put(`/api/inquiries/update/${editingInquiry.id}`, inquiryForm);
                alert("Inquiry updated successfully");
            }
            else{
                await API.post("/api/inquiries/create", inquiryForm);
                alert("Inquiry created successfully");
            }
            
            setShowForm(false);
            setEditingInquiry(null);
            fetchInquiries();
        }catch(error){
            console.error("Error saving inquiry: ", error.response?.data?.message);
        }
    };

    const editInquiry = (inquiry) => {
        setEditingInquiry(inquiry);
        setInquiryForm({
            customerName: inquiry.customerName,
            contactDetails: inquiry.contactDetails,
            productType: inquiry.productType,
            source: inquiry.source,
            description: inquiry.description,
            status: inquiry.status,
        });
        setShowForm(true);
    };

    const deleteInquiry = async (id) => {
        if (!window.confirm("Are you sure, you want to delete this inquiry?")) return;
        try{
            await API.delete(`/api/inquiries/delete/${id}`);
            fetchInquiries();
            alert("Inquiry deleted successfully");
        } catch(error){
            console.error("Error deleting inquiry: ", error.response?.data?.message);
            
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-white mb-4">Inquiries</h2>
            
            {/* Add Inquiry Button */}
            <button
                onClick={() => {
                    setEditingInquiry(null);
                    setInquiryForm({
                        customerName: "",
                        contactDetails: "",
                        productType: "standard",
                        source: "email",
                        description: "",
                        status: "pending",
                    });
                    setShowForm(true);
                }}
                className="w-full p-3 bg-green-500 px-4 py-2 rounded-md text-white font-semibold hover:bg-green-600 transition-all"
                >
                Add Inquiry
            </button>

            {showForm && (
                <div className="mt-4 p-4 border border-gray-500">
                    <h3 className="text-xl font-semibold text-white">{editingInquiry ? "Edit Inquiry" : "Create Inquiry"}</h3>

                    <input
                        type="text"
                        name="customerName"
                        placeholder="Customer Name"
                        value={inquiryForm.customerName}
                        onChange={handleInquiryInputChange}
                        className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600"
                    />

                    <input
                        type="text"
                        name="contactDetails"
                        placeholder="Contact Details"
                        value={inquiryForm.contactDetails}
                        onChange={handleInquiryInputChange}
                        className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600"
                    />

                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={inquiryForm.description}
                        onChange={handleInquiryInputChange}
                        className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600 mb-3"
                    />

                    <label className="block mt-2 font-semibold mb-2">Product Type:</label>
                    <select name="productType" value={inquiryForm.productType} onChange={handleInquiryInputChange} className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 mb-3">
                        <option value="standard">Standard</option>
                        <option value="non-standard">Non-Standard</option>
                    </select>

                    <label className="block mt-2 font-semibold mb-2">Source:</label>
                    <select name="source" value={inquiryForm.source} onChange={handleInquiryInputChange} className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 mb-3">
                        <option value="email">Email</option>
                        <option value="social Media">Social Media</option>
                        <option value="verbal">Verbal</option>
                    </select>

                    <label className="block font-semibold mt-2 mb-2">Status:</label>
                    <select name="status" value={inquiryForm.status} onChange={handleInquiryInputChange} className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 mb-3">
                        <option value="pending">Pending</option>
                        <option value="quoted">Quoted</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="closed">Closed</option>
                    </select>

                    <button onClick={submitInquiry} className="w-full block bg-blue-500 px-4 py-2 mt-3 rounded-md text-white font-semibold hover:bg-blue-600 transition-all">
                        {editingInquiry ? "Update" : "Create"}
                    </button>

                    <button onClick={() => setShowForm(false)} className="bg-red-500 text-white w-full px-4 py-2 mt-2 rounded font-semibold hover:bg-red-600 transition-all">
                        Close
                    </button>
                </div>
            )}

            <table className="min-w-full border-collapse border border-gray-700 mt-6 text-white">
                <thead>
                    <tr className="bg-gray-900">
                        <th className="border border-gray-700 p-3">Customer</th>
                        <th className="border border-gray-700 p-3">Contact</th>
                        <th className="border border-gray-700 p-3">Product Type</th>
                        <th className="border border-gray-700 p-3">Source</th>
                        <th className="border border-gray-700 p-3">Status</th>
                        <th className="border border-gray-700 p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inquiries.map((inquiry) => (
                        <tr key={inquiry.id} className="border">
                            <td className="text-center border border-gray-700 p-3">{inquiry.customerName}</td>
                            <td className="text-center border border-gray-700 p-3">{inquiry.contactDetails}</td>
                            <td className="text-center border border-gray-700 p-3">{inquiry.productType}</td>
                            <td className="text-center border border-gray-700 p-3">{inquiry.source}</td>
                            <td className="text-center border border-gray-700 p-3">{inquiry.status}</td>
                            <td className="text-center border border-gray-700 p-3">
                                <button
                                    onClick={() => viewInquiryDetails(inquiry.id)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600 transition-all"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => editInquiry(inquiry)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition-all"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteInquiry(inquiry.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showInquiryDetails && selectedInquiry && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-1/2">
                        <h3 className="text-xl font-semibold text-white mb-3">Inquiry Details</h3>
                        <p className="text-white"><strong>ID:</strong> {selectedInquiry.id}</p>
                        <p className="text-white"><strong>Customer:</strong> {selectedInquiry.customerName}</p>
                        <p className="text-white"><strong>Contact Details:</strong> {selectedInquiry.contactDetails}</p>
                        <p className="text-white"><strong>Description:</strong> {selectedInquiry.description}</p>
                        <p className="text-white"><strong>Product Type:</strong> {selectedInquiry.productType}</p>
                        <p className="text-white"><strong>Source:</strong> {selectedInquiry.source}</p>
                        <p className="text-white"><strong>Status:</strong> {selectedInquiry.status}</p>

                        <button
                            onClick={() => setShowInquiryDetails(false)}
                            className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600 transition-all"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Inquiry;