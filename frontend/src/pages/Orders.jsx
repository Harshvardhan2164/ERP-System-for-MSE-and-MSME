import { useState, useEffect } from "react";
import API from "../utils/api";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [orderForm, setOrderForm] = useState({
        quotationId: "",
        customerName: "",
        orderItems: [{ itemCode: "", quantity: 0, price: 0 }],
        totalAmount: 0,
        paymentStatus: "pending",
        status: "pending",
    });
    const [editingOrder, setEditingOrder] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showOrderDetails, setShowOrderDetails] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await API.get("/api/orders/");
            setOrders(response.data.map(order => ({
                ...order,
                orderItems: order.orderItems || []
            })));
        } catch (error) {
            console.error("Error fetching orders:", error.response?.data?.message);
        }
    };

    const viewOrderDetails = async (id) => {
        try{
            const response = await API.get(`/api/orders/${id}`);
            setSelectedOrder(response.data);
            setShowOrderDetails(true);
        } catch(error){
            console.error("Error fetching order records: ", error.response?.data?.message);
        }
    };

    const formatToINR = (amount) => {
        return new Intl.NumberFormat('en-IN', { 
            style: 'currency', 
            currency: 'INR' 
        }).format(amount);
    };

    const handleOrderInputChange = (e) => {
        const { name, value } = e.target;
        setOrderForm({ ...orderForm, [name]: value });
    };

    const handleOrderItemChange = (index, field, value) => {
        const updatedItems = [...orderForm.orderItems];
        updatedItems[index][field] = field === "quantity" || field === "price" ? Number(value) : value;
        setOrderForm({ ...orderForm, orderItems: updatedItems });
        updateTotalAmount(updatedItems);
    };

    const addOrderItem = () => {
        const updatedItems = [...orderForm.orderItems, { itemCode: "", quantity: "", price: "" }];
        setOrderForm({ ...orderForm, orderItems: updatedItems });
        updateTotalAmount(updatedItems);
    };

    const removeOrderItem = (index) => {
        const updatedItems = orderForm.orderItems.filter((_, i) => i !== index);
        setOrderForm({ ...orderForm, orderItems: updatedItems });
        updateTotalAmount(updatedItems);
    };

    const updateTotalAmount = (items) => {
        const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        setOrderForm((prev) => ({ ...prev, totalAmount: total }));
    };

    const submitOrder = async () => {
        try {
            if (editingOrder) {
                await API.put(`/api/orders/${editingOrder.id}/status`, orderForm);
                alert("Order updated successfully")
            } else {
                const apiUrl = orderForm.quotationId ? "/api/orders/create" : "/api/orders/create-new";

                await API.post(apiUrl, orderForm);
                alert("Order added successfully")
            }
            setShowForm(false);
            setEditingOrder(null);
            fetchOrders();
        } catch (error) {
            console.error("Error saving order:", error.response?.data?.message);
        }
    };

    const editOrder = (order) => {
        setEditingOrder(order);
        setOrderForm({
            quotationId: order.quotationId,
            customerName: order.customerName,
            orderItems: order.orderItems || [],
            totalAmount: order.totalAmount,
            paymentStatus: order.paymentStatus,
            status: order.status,
        });
        setShowForm(true);
    };

    const deleteOrder = async (id) => {
        if (!window.confirm("Are you sure, you want to delete this order?")) return;
        try {
            await API.delete(`/api/orders/delete/${id}`);
            fetchOrders();
            alert("Order deleted successfully!");
        } catch (error) {
            console.error("Error deleting order:", error.response?.data?.message);
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-white mb-4">Sale Orders</h2>
            
            <button
                onClick={() => {
                    setEditingOrder(null);
                    setOrderForm({
                        quotationId: "",
                        orderItems: [{ itemCode: "", quantity: 0, price: 0 }],
                        totalAmount: 0,
                        paymentStatus: "pending",
                        status: "pending",
                    });
                    setShowForm(true);
                }}
                className="w-full p-3 bg-green-500 px-4 py-2 rounded-md text-white font-semibold hover:bg-green-600 transition-all"
                >
                Add Order
            </button>

            {showForm && (
                <div className="mt-4 p-4 border border-gray-500">
                    <h3 className="text-xl font-semibold text-white">{editingOrder ? "Edit Order" : "Create Order"}</h3>

                    <input
                        type="text"
                        name="quotationId"
                        placeholder="Quotation ID"
                        value={orderForm.quotationId}
                        onChange={handleOrderInputChange}
                        className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600"
                    />

                    <input
                        type="text"
                        name="customerName"
                        placeholder="Customer Name"
                        value={orderForm.customerName}
                        onChange={handleOrderInputChange}
                        className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600 mb-3"
                    />

                    {orderForm.orderItems.map((item, index) => (
                        <div key={index} className="flex mt-2 mb-3">
                            <input
                                type="text"
                                placeholder="Item Code"
                                value={item.itemCode}
                                onChange={(e) => handleOrderItemChange(index, "itemCode", e.target.value)}
                                className="rounded bg-gray-700 text-white border border-gray-600 p-2 mr-2 w-1/3"
                            />
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={item.quantity === 0 ? "" : item.quantity}
                                onChange={(e) => handleOrderItemChange(index, "quantity", e.target.value)}
                                className="border p-2 mr-2 w-1/4"
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={item.price === 0 ? "" : item.price}
                                onChange={(e) => handleOrderItemChange(index, "price", e.target.value)}
                                className="border p-2 w-1/4"
                            />
                            <button onClick={() => removeOrderItem(index)} className="bg-red-500 text-white px-2 ml-2 hover:bg-red-600">X</button>
                        </div>
                    ))}
    
                    <label className="block font-semibold mt-2 mb-2">Status:</label>
                    <select name="status" value={orderForm.status} onChange={handleOrderInputChange} className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 mb-3">
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    <label className="block mt-2 font-semibold mb-2">Payment Status:</label>
                    <select name="paymentStatus" value={orderForm.paymentStatus} onChange={handleOrderInputChange} className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 mb-3">
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="failed">Failed</option>
                    </select>

                    <button onClick={addOrderItem} className="bg-green-500 text-white px-4 py-2 mt-2 rounded-md font-semibold hover:bg-green-700 transition-all">+ Add Item</button>

                    <button onClick={submitOrder} className="w-full block bg-blue-500 px-4 py-2 mt-3 rounded-md text-white font-semibold hover:bg-blue-600 transition-all">
                        {editingOrder ? "Update" : "Create"}
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
                        <th className="border border-gray-700 p-3">Total Amount</th>
                        <th className="border border-gray-700 p-3">Order Status</th>
                        <th className="border border-gray-700 p-3">Payment Status</th>
                        <th className="border border-gray-700 p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="border">
                            <td className="text-center border border-gray-700 p-3">{order.customerName}</td>
                            <td className="text-center border border-gray-700 p-3">{formatToINR(order.totalAmount)}</td>
                            <td className="text-center border border-gray-700 p-3">{order.status}</td>
                            <td className="text-center border border-gray-700 p-3">{order.paymentStatus}</td>
                            <td className="text-center border border-gray-700 p-3">
                                <button
                                    onClick={() => viewOrderDetails(order.id)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600 transition-all"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => editOrder(order)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition-all"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteOrder(order.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showOrderDetails && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-1/2">
                        <h3 className="text-xl font-semibold text-white mb-3">Order Details</h3>
                        <p className="text-white"><strong>Quotation ID:</strong> {selectedOrder.quotationId}</p>
                        <p className="text-white"><strong>Customer:</strong> {selectedOrder.customerName}</p>
                        <p className="text-white"><strong>Total Amount:</strong> {formatToINR(selectedOrder.totalAmount)}</p>
                        <p className="text-white"><strong>Status:</strong> {selectedOrder.status}</p>
                        <p className="text-white"><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>

                        <h4 className="text-lg font-semibold text-white mt-4">Order Items:</h4>
                        <ul className="text-white">
                            {selectedOrder.orderItems?.map((item, index) => (
                                <li key={index} className="mt-2">
                                    {item.productName} - {item.quantity} x {formatToINR(item.price)}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => setShowOrderDetails(false)}
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

export default Orders;