import { useState, useEffect } from "react";
import API from "../utils/api";

const Accounts = () => {
    const [ expenses, setExpenses ] = useState([]);
    const [ revenues, setRevenue ] = useState([]);
    const [ report, setReport ] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [ expenseFormData, setExpenseFormData ] = useState({
        category: "",
        amount: "",
        description: "",
        date: "",
    });
    const [ revenueFormData, setRevenueFormData ] = useState({
        source: "",
        amount: "",
        description: "",
        date: "",
    });

    useEffect(() => {
        fetchExpenses();
        fetchRevenues();
    }, []);

    const fetchExpenses = async () => {
        try{
            const response = await API.get("/api/accounts/expenses/");
            setExpenses(response.data);
        } catch(error) {
            console.error("Error fetching expenses: ", error.response?.data?.response);
        }
    };

    const fetchRevenues = async () => {
        try{
            const response = await API.get("/api/accounts/revenues/");
            setRevenue(response.data);
        } catch(error){
            console.error("Error fetching revenues: ", error.response?.data?.message);
        }
    };

    const fetchReport = async () => {
        if(!selectedMonth) return;
        try{
            const response = await API.post("/api/accounts/financial-report/generate", { month: selectedMonth });
            setReport(response.data.report);
        } catch(error) {
            console.error("Error fetching financial report: ", error.response?.data?.message);
        }
    };

    const formatToINR = (amount) => {
        return new Intl.NumberFormat('en-IN', { 
            style: 'currency', 
            currency: 'INR' 
        }).format(amount);
    };

    const handleChangeExpense = (e) => {
        setExpenseFormData({ ...expenseFormData, [e.target.name]: e.target.value });
    };

    const handleChangeRevenue = (e) => {
        setRevenueFormData({ ...revenueFormData, [e.target.name]: e.target.value });
    };

    const handleSubmitExpense = async (e) => {
        e.preventDefault();
        try{
            await API.post("/api/accounts/expenses/add", expenseFormData);
            fetchExpenses();
            setExpenseFormData({ category: "", amount: "", description: "", data: "" });
        } catch (error){
            console.error("Error saving the expense: ", error.response?.data?.message);
        }
    };

    const handleSubmitRevenue = async (e) => {
        e.preventDefault();
        try{
            await API.post("/api/accounts/revenues/add", revenueFormData);
            fetchRevenues();
            setRevenueFormData({ source: "", amount: "", description: "", data: "" });
        } catch(error){
            console.error("Error saving the revenue: ", error.response?.data?.message);
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-white mb-4">Expense Management</h2>

            <form onSubmit={handleSubmitExpense} className="mb-6">
            <input type="text" name="category" placeholder="Category" value={expenseFormData.category} onChange={handleChangeExpense} className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 mb-3" required />
                <input type="number" name="amount" placeholder="Amount" value={expenseFormData.amount} onChange={handleChangeExpense} className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 mb-3" required />
                <input type="text" name="description" placeholder="Description" value={expenseFormData.description} onChange={handleChangeExpense} className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 mb-3" required />
                <input type="date" name="date" placeholder="Date" value={expenseFormData.date} onChange={handleChangeExpense} className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 mb-3" required />
                <button type="submit" className="w-full bg-green-500 text-white hover:bg-green-600 rounded px-4 py-2">
                    Add
                </button>
            </form>
            
            <table className="min-w-full border-collapse border border-gray-700 mt-6 text-white">
                <thead>
                <tr className="bg-gray-900">
                    <th className="border border-gray-700 p-3">ID</th>
                    <th className="border border-gray-700 p-3">Category</th>
                    <th className="border border-gray-700 p-3">Amount</th>
                    <th className="border border-gray-700 p-3">Description</th>
                    <th className="border border-gray-700 p-3">Date</th>
                </tr>
                </thead>
                <tbody>
                {expenses.map((exp) => (
                    <tr key={exp.id} className="border">
                    <td className="text-center border border-gray-700 p-3">{exp.id}</td>
                    <td className="text-center border border-gray-700 p-3">{exp.category}</td>
                    <td className="text-center border border-gray-700 p-3">{formatToINR(exp.amount)}</td>
                    <td className="text-center border border-gray-700 p-3">{exp.description}</td>
                    <td className="text-center border border-gray-700 p-3">{exp.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h2 className="text-3xl font-semibold text-white mb-4 mt-6">Revenue Management</h2>

            <form onSubmit={handleSubmitRevenue} className="mb-6">
            <input type="text" name="source" placeholder="Source" value={revenueFormData.source} onChange={handleChangeRevenue} className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 mb-3" required />
                <input type="number" name="amount" placeholder="Amount" value={revenueFormData.amount} onChange={handleChangeRevenue} className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 mb-3" required />
                <input type="text" name="description" placeholder="Description" value={revenueFormData.description} onChange={handleChangeRevenue} className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 mb-3" required />
                <input type="date" name="date" placeholder="Date" value={revenueFormData.date} onChange={handleChangeRevenue} className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 mb-3" required />
                <button type="submit" className="w-full bg-green-500 text-white hover:bg-green-600 rounded px-4 py-2">
                    Add
                </button>
            </form>
            
            <table className="min-w-full border-collapse border border-gray-700 mt-6 text-white">
                <thead>
                <tr className="bg-gray-900">
                    <th className="border border-gray-700 p-3">ID</th>
                    <th className="border border-gray-700 p-3">Source</th>
                    <th className="border border-gray-700 p-3">Amount</th>
                    <th className="border border-gray-700 p-3">Description</th>
                    <th className="border border-gray-700 p-3">Date</th>
                </tr>
                </thead>
                <tbody>
                {revenues.map((rev) => (
                    <tr key={rev.id} className="border">
                    <td className="text-center border border-gray-700 p-3">{rev.id}</td>
                    <td className="text-center border border-gray-700 p-3">{rev.source}</td>
                    <td className="text-center border border-gray-700 p-3">{formatToINR(rev.amount)}</td>
                    <td className="text-center border border-gray-700 p-3">{rev.description}</td>
                    <td className="text-center border border-gray-700 p-3">{rev.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h2 className="text-3xl font-semibold text-white mt-6 mb-4">Financial Report</h2>
            <input 
                type="month" 
                value={selectedMonth} 
                onChange={(e) => setSelectedMonth(e.target.value)} 
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 mb-3"
            />
            <button onClick={fetchReport} className="w-full bg-green-500 hover:bg-green-600 rounded text-white px-4 py-2">Generate Report</button>
            
            {report ? (
                <div className="mt-4 p-4 border border-gray-300">
                    <h3 className="text-xl font-semibold text-white mb-3">Report for {selectedMonth}</h3>
                    <p><strong>Total Revenue:</strong> {formatToINR(report.totalRevenue) ?? 0}</p>
                    <p><strong>Total Expenses:</strong> {formatToINR(report.totalExpenses) ?? 0}</p>
                    <p><strong>Net Profit:</strong> {formatToINR(report.netProfit) ?? 0}</p>
                </div>
            ) : (
                <p className="text-red-500 mt-4">No financial report available.</p>
            )}
        </div>
    );
};

export default Accounts;