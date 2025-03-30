import { useEffect, useState } from "react";
import API from "../utils/api";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        quantity: "",
        price: 0,
        productCode: "",
        lowStockThreshold: "",
    });
    const [updateProduct, setUpdateProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try{
            const response = await API.get("/api/products/");
            setProducts(response.data);
        } catch(error){
            console.error("Error fetching products: ", error.response?.data?.message);
        }
    };

    const fetchLowStockProducts = async () => {
        try{
            const response = await API.get("/api/products/low-stock/alerts");
            setProducts(response.data.lowStockProducts);
        } catch (error){
            console.error("Error fetching low stock products: ", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const formatToINR = (amount) => {
        return new Intl.NumberFormat('en-IN', { 
            style: 'currency', 
            currency: 'INR' 
        }).format(amount);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(updateProduct){
                await API.put(`/api/products/update/${updateProduct.id}`, formData);
                alert("Product updated successfully!");
            }
            else{
                await API.post("/api/products/add", formData);
                alert("Product added successfully!");
            }

            setShowForm(false);
            setFormData({ name: "", category: "", quantity: "", price: "", productCode: "", lowStockThreshold: "" });
            setUpdateProduct(null);
            fetchProducts();
        } catch (error) {
            console.error("Error saving product: ", error.response?.data?.message);
        }
    };

    const handleEdit = (product) => {
        setUpdateProduct(product);
        setFormData(product);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure, you want to delete this product?")) return;
        try{
            await API.delete(`/api/products/delete/${id}`);
            fetchProducts();
            alert("Product deleted successfully!");
        } catch (error){
            console.error("Error deleting product: ", error.response?.data?.message);
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-white mb-4">Product Management</h2>

            <button
                onClick={() => {
                    setUpdateProduct(null);
                    setFormData({
                        name: "",
                        category: "",
                        quantity: "",
                        price: 0,
                        productCode: "",
                        lowStockThreshold: "",
                    });
                    setShowForm(true);
                }}
                className="w-full mb-6 p-3 bg-green-500 px-4 py-2 rounded-md text-white font-semibold hover:bg-green-600 transition-all"
            >
                Add Product
            </button>

            {showForm && (
                <div className="mt-4 p-4 border border-gray-500">
                    <h3 className="text-xl font-semibold text-white">Add Product</h3>

                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600" required />
                    <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600" required />
                    <input type="text" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600" required />
                    <input type="number" name="price" placeholder="Price" value={formData.price === 0 ? "" : formData.price} onChange={handleChange} className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600" required />
                    <input type="text" name="productCode" placeholder="Product Code" value={formData.productCode} onChange={handleChange} className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600" required />
                    <input type="number" name="lowStockThreshold" placeholder="Low Stock Limit" value={formData.lowStockThreshold} onChange={handleChange} className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600" required />

                    <button type="submit" className="w-full bg-blue-500 px-4 py-2 mt-6 rounded-md text-white font-semibold hover:bg-blue-600 transition-all">
                    {updateProduct ? "Update" : "Add"}
                    </button>
                    
                    <button onClick={() => setShowForm(false)} className="bg-red-500 text-white w-full px-4 py-2 mt-2 rounded font-semibold hover:bg-red-600 transition-all">
                        Close
                    </button>
                </div>
            )}

            <div className="flex justify-center items-center space-x-6">
                <button onClick={fetchLowStockProducts} className="w-3/8 mr-6 bg-blue-600 px-4 py-2 rounded-md text-white font-semibold hover:bg-blue-700 transition-all">
                    Check Low Stock
                </button>
                <button onClick={fetchProducts} className="w-3/8 bg-blue-600 px-4 py-2 rounded-md text-white font-semibold hover:bg-blue-700 transition-all">
                    Check Inventory
                </button>

            </div>

            <table className="min-w-full border-collapse border border-gray-700 mt-6 text-white">
                <thead>
                <tr className="bg-gray-900">
                    <th className="border border-gray-700 p-3">ID</th>
                    <th className="border border-gray-700 p-3">Name</th>
                    <th className="border border-gray-700 p-3">Category</th>
                    <th className="border border-gray-700 p-3">Quantity</th>
                    <th className="border border-gray-700 p-3">Price</th>
                    <th className="border border-gray-700 p-3">Product Code</th>
                    <th className="border border-gray-700 p-3">Low Stock Limit</th>
                    <th className="border border-gray-700 p-3">Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((pro) => (
                    <tr key={pro.id} className="border">
                    <td className="text-center border border-gray-700 p-3">{pro.id}</td>
                    <td className="text-center border border-gray-700 p-3">{pro.name}</td>
                    <td className="text-center border border-gray-700 p-3">{pro.category}</td>
                    <td className="text-center border border-gray-700 p-3">{pro.quantity}</td>
                    <td className="text-center border border-gray-700 p-3">{formatToINR(pro.price)}</td>
                    <td className="text-center border border-gray-700 p-3">{pro.productCode}</td>
                    <td className="text-center border border-gray-700 p-3">{pro.lowStockThreshold}</td>
                    <td className="text-center border border-gray-700 p-3">
                        <button onClick={() => handleEdit(pro)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition-all">Edit</button>
                        <button onClick={() => handleDelete(pro.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all">Delete</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;