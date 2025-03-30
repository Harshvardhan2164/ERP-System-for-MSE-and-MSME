import { useState, useEffect } from "react";
import API from "../utils/api";

const Quotation = () => {
    const [quotations, setQuotation] = useState([]);
    const [quotationForm, setQuotationForm] = useState({
       inquiryId: "",
       quotationDate: "",
       items: [{ itemCode: "", quantity: 0, price: 0 }],
       totalAmount: 0,
       status: "pending"
    });

    const [editingQuotation, setEditingQuotation] = useState(null);
    const [selectedQuotation, setSelectedQuotation] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showQuotationDetails, setShowQuotationDetails] = useState(false);

    useEffect(() => {
        fetchQuotations();
    }, []);

    const fetchQuotations = async () => {
        try{
            const response = await API.get("/api/quotations/");
            setQuotation(response.data);
        } catch(error){
            console.error("Error fetching quotations: ", error.response?.data?.message);   
        }
    };

    const viewQuotationDetails = async (id) => {
        try{
            const response = await API.get(`/api/quotations/${id}`);
            setSelectedQuotation(response.data);
            setShowQuotationDetails(true);
        } catch(error){
            console.error("Error fetching quotation: ", error.response?.data?.message);
        }
    };

    const handleQuotationInputChange = (e) => {
        const { name, value } = e.target;
        setQuotationForm({ ...quotationForm, [name]: value });
    };

    const handleQuotationItemChange = (index, field, value) => {
        const updatedItems = [...quotationForm.items];
        updatedItems[index][field] = field === "quantity" || field === "price" ? Number(value) : value;
        setQuotationForm({ ...quotationForm, items: updatedItems });
        updateTotalAmount(updatedItems);
    };

    const addQuotationItem = () => {
        const updatedItems = [...quotationForm.items, { itemCode: "", quantity: "", price: "" }];
        setQuotationForm({ ...quotationForm, items: updatedItems })
        updateTotalAmount(updatedItems);
    };

    const removeQuotationItem = (index) => {
        const updatedItems = quotationForm.items.filter((_, i) => i !== index);
        setQuotationForm({ ...quotationForm, items:updatedItems });
        updateTotalAmount(updatedItems);
    };

    const updateTotalAmount = (items) => {
        const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        setQuotationForm((prev) => ({ ...prev, totalAmount: total }));
    };

    const formatToINR = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: "currency",
            currency: "INR"
        }).format(amount);
    };

    const submitQuotation = async () => {
        try{
            if(editingQuotation){
                await API.put(`/api/quotations/update/${id}`, quotationForm);
                alert("Quotation updated successfully");
            }
            else{
                await API.post("/api/quotations/create", quotationForm);
                alert("Quotation created successfully");
            }

            setShowForm(false);
            setEditingQuotation(null);
            fetchQuotations();
        } catch(error){
            console.error("Error saving quotation: ", error.response?.data?.message);
        }
    };

    const editQuotation = (quotation) => {
        setEditingQuotation(quotation);
        setQuotationForm({
            inquiryId: quotation.inquiryId,
            customerName: quotation.customerName,
            productType: quotation.productType,
            items: quotation.items || [],
            totalAmount: quotation.totalAmount,
            status: quotation.status
        });
        setShowForm(true);
    };

    const deleteQuotation = async (id) => {
        if(!window.confirm("Are you sure, you want to delete this quotation?")) return;
        try{
            await API.delete(`/api/quotations/delete/${id}`);
            fetchQuotations();
            alert("Quotation deleted successfully");
        } catch(error){
            console.error("Error deleting quotation: ", error.response?.data?.message);
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-white mb-4">Quotations</h2>
            
            <button
                onClick={() => {
                    setEditingQuotation(null);
                    setQuotationForm({
                        inquiryId: "",
                        items: [{ itemCode: "", quantity: 0, price: 0 }],
                        totalAmount: 0,
                        status: "pending",
                    });
                    setShowForm(true);
                }}
                className="w-full p-3 bg-green-500 px-4 py-2 rounded-md text-white font-semibold hover:bg-green-600 transition-all"
            >
                Add Quotation
            </button>

            {showForm && (
                <div className="mt-4 p-4 border border-gray-500">
                    <h3 className="text-xl font-semibold text-white">{editingQuotation ? "Edit Quotation" : "Create Quotation"}</h3>

                    <input
                        type="text"
                        name="inquiryId"
                        placeholder="Inquiry ID"
                        value={quotationForm.inquiryId}
                        onChange={handleQuotationInputChange}
                        className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600 mb-3"
                    />

                    {quotationForm.items.map((item, index) => (
                        <div key={index} className="flex mt-2 mb-3">
                            <input
                                type="text"
                                placeholder="Item Code"
                                value={item.itemCode}
                                onChange={(e) => handleQuotationItemChange(index, "itemCode", e.target.value)}
                                className="rounded bg-gray-700 text-white border border-gray-600 p-2 mr-2 w-1/3"
                            />
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={item.quantity === 0 ? "" : item.quantity}
                                onChange={(e) => handleQuotationItemChange(index, "quantity", e.target.value)}
                                className="border p-2 mr-2 w-1/4"
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={item.price === 0 ? "" : item.price}
                                onChange={(e) => handleQuotationItemChange(index, "price", e.target.value)}
                                className="border p-2 w-1/4"
                            />
                            <button onClick={() => removeQuotationItem(index)} className="bg-red-500 text-white px-2 ml-2 hover:bg-red-600">X</button>
                        </div>
                    ))}

                    <label className="block font-semibold mt-3 mb-2">Status:</label>
                    <select name="status" value={quotationForm.status} onChange={handleQuotationInputChange} className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 mb-3">
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>

                    <button onClick={addQuotationItem} className="bg-green-500 text-white px-4 py-2 mt-2 rounded-md font-semibold hover:bg-green-700 transition-all">+ Add Item</button>

                    <button onClick={submitQuotation} className="w-full block bg-blue-500 px-4 py-2 mt-3 rounded-md text-white font-semibold hover:bg-blue-600 transition-all">
                        {editingQuotation ? "Update" : "Create"}
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
                        <th className="border border-gray-700 p-3">Product Type</th>
                        <th className="border border-gray-700 p-3">Total Amount</th>
                        <th className="border border-gray-700 p-3">Quotation Status</th>
                        <th className="border border-gray-700 p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {quotations.map((quotation) => (
                        <tr key={quotation.id} className="border">
                            <td className="text-center border border-gray-700 p-3">{quotation.customerName}</td>
                            <td className="text-center border border-gray-700 p-3">{quotation.productType}</td>
                            <td className="text-center border border-gray-700 p-3">{formatToINR(quotation.totalAmount)}</td>
                            <td className="text-center border border-gray-700 p-3">{quotation.status}</td>
                            <td className="text-center border border-gray-700 p-3">
                                <button
                                    onClick={() => viewQuotationDetails(quotation.id)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600 transition-all"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => editQuotation(quotation)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition-all"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteQuotation(quotation.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showQuotationDetails && selectedQuotation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-1/2">
                        <h3 className="text-xl font-semibold text-white mb-3">Quotation Details</h3>
                        <p className="text-white"><strong>ID:</strong> {selectedQuotation.id}</p>
                        <p className="text-white"><strong>Inquiry ID:</strong> {selectedQuotation.inquiryId}</p>
                        <p className="text-white"><strong>Customer:</strong> {selectedQuotation.customerName}</p>
                        <p className="text-white"><strong>Product Type:</strong> {selectedQuotation.productType}</p>
                        <p className="text-white"><strong>Total Amount:</strong> {formatToINR(selectedQuotation.totalAmount)}</p>
                        <p className="text-white"><strong>Status:</strong> {selectedQuotation.status}</p>

                        <h4 className="text-lg font-semibold text-white mt-4">Quotation Items:</h4>
                        <ul className="text-white">
                            {selectedQuotation.items?.map((item, index) => (
                                <li key={index} className="mt-2">
                                    {item.productName} - {item.quantity} x {formatToINR(item.price)}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => setShowQuotationDetails(false)}
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

export default Quotation;