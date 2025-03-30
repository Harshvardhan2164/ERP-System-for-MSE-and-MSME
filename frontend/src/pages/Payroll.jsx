import { useEffect, useState } from "react";
import API from "../utils/api";

const Payroll = () => {
  const [payrollRecords, setPayrollRecords] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    salary: 0,
    bonus: 0,
    deductions: 0,
    paymentDate: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPayrollRecords();
  }, []);

  const fetchPayrollRecords = async () => {
    try {
      const response = await API.get("/api/payrolls/");
      setPayrollRecords(response.data);
    } catch (error) {
      console.error("Error fetching payroll records:", error.response?.data?.message);
    }
  };

  const formatToINR = (amount) => {
    return new Intl.NumberFormat('en-IN', { 
        style: 'currency', 
        currency: 'INR' 
    }).format(amount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(
        "/api/payrolls/pay",
        {
          ...formData,
          bonus: formData.bonus || 0,
          deductions: formData.deductions || 0,
        });
        setShowForm(false);
        setFormData({ employeeId: "", salary: "", bonus: "", deductions: "", paymentDate: "" });
        fetchPayrollRecords();
      alert("Payroll paid successfully!");
    } catch (error) {
      console.error("Error processing payroll:", error.response?.data?.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-white mb-6">Payroll Management</h2>

      <button
        onClick={() => {
          setFormData({
            employeeId: "",
            salary: 0,
            bonus: 0,
            deductions: 0,
            paymentDate: "",
          });
          setShowForm(true);
        }}
        className="w-full p-3 bg-green-500 px-4 py-2 rounded-md text-white font-semibold hover:bg-green-600 transition-all"
      >
        Process Payroll
      </button>

      {showForm && (
        <div className="mt-4 p-4 border border-gray-500">
          <h3 className="text-xl font-semibold text-white">Payroll</h3>

          <input
            type="text"
            name="employeeId"
            placeholder="Employee ID"
            value={formData.employeeId}
            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600"
            required
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary === 0 ? "" : formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600"
            required
          />
          <input
            type="number"
            name="bonus"
            placeholder="Bonus"
            value={formData.bonus === 0 ? "" : formData.bonus}
            onChange={(e) => setFormData({ ...formData, bonus: e.target.value })}
            className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600"
          />
          <input
            type="number"
            name="deductions"
            placeholder="Deductions"
            value={formData.deductions === 0 ? "" : formData.deductions}
            onChange={(e) => setFormData({ ...formData, deductions: e.target.value })}
            className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600"
          />
          <input
            type="date"
            name="paymentDate"
            value={formData.paymentDate}
            onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
            className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600"
            required
          />

          <button type="submit" className="w-full mt-6 bg-blue-500 text-white hover:bg-blue-600 px-4 py-2">
            Process Payroll
          </button>
          <button onClick={() => setShowForm(false)} className="bg-red-500 text-white w-full px-4 py-2 mt-2 rounded font-semibold hover:bg-red-600 transition-all">
            Close
          </button>
        </div>  
      )}

      <table className="min-w-full border-collapse border mt-6 border-gray-300">
        <thead>
          <tr className="bg-gray-900">
            <th className="border border-gray-700 p-3">Employee Name</th>
            <th className="border border-gray-700 p-3">Salary</th>
            <th className="border border-gray-700 p-3">Bonus</th>
            <th className="border border-gray-700 p-3">Deductions</th>
            <th className="border border-gray-700 p-3">Net Pay</th>
            <th className="border border-gray-700 p-3">Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {payrollRecords.map((record) => (
            <tr key={record.id} className="border">
              <td className="text-center border border-gray-700 p-3">{record.employeeName}</td>
              <td className="text-center border border-gray-700 p-3">{formatToINR(record.salary)}</td>
              <td className="text-center border border-gray-700 p-3">{formatToINR(record.bonus)}</td>
              <td className="text-center border border-gray-700 p-3">{formatToINR(record.deductions)}</td>
              <td className="text-center border border-gray-700 p-3 font-bold">${record.netPay}</td>
              <td className="text-center border border-gray-700 p-3">{record.paymentDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payroll;