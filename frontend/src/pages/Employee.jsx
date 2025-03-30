import { useEffect, useState } from "react";
import API from "../utils/api";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    salary: 0,
    email: "",
  });
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await API.get("/api/employees/");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error.response?.data?.message);
    }
  };

  const formatToINR = (amount) => {
    return new Intl.NumberFormat('en-IN', { 
        style: 'currency', 
        currency: 'INR' 
    }).format(amount);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEmployee) {
        await API.put(
          `/api/employees/update/${editingEmployee.id}`, formData);
          alert("Employee updated successfully!");
      } else {
        await API.post("/api/employees/add", formData);
        alert("Employee added successfully!");
      }

      setShowForm(false);
      setFormData({ name: "", position: "", department: "", salary: "", email: "" });
      setEditingEmployee(null);
      fetchEmployees();
    } catch (error) {
      console.error("Error saving employee:", error.response?.data?.message);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData(employee);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await API.delete(`/api/employees/delete/${id}`);
      fetchEmployees();
      alert("Employee deleted successfully!");
    } catch (error) {
      console.error("Error deleting employee:", error.response?.data?.message);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-white mb-4">Employee Management</h2>

      <button
        onClick={() => {
          setEditingEmployee(null);
          setFormData({
            name: "",
            position: "",
            department: "",
            salary: 0,
            email: "",
          });
          setShowForm(true);
        }}
        className="w-full p-3 bg-green-500 px-4 py-2 rounded-md text-white font-semibold hover:bg-green-600 transition-all"
      >
        Add Employee
      </button>

      {showForm && (
        <div className="mt-4 p-4 border border-gray-500">
          <h3 className="text-xl font-semibold text-white">{editingEmployee ? "Edit Employee" : "Create Employee"}</h3>

          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600" required />
          <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600" required />
          <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600" required />
          <input type="number" name="salary" placeholder="Salary" value={formData.salary === 0 ? "" : formData.salary} onChange={handleChange} className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600" required />
          <button type="submit" className="w-full bg-blue-500 px-4 py-2 mt-4 rounded-md text-white font-semibold hover:bg-blue-600 transition-all">
            {editingEmployee ? "Update" : "Add"}
          </button>
          <button onClick={() => setShowForm(false)} className="bg-red-500 text-white w-full px-4 py-2 mt-2 rounded font-semibold hover:bg-red-600 transition-all">
              Close
          </button>
        </div>
      )}


      <table className="min-w-full border-collapse border border-gray-700 mt-6 text-white">
        <thead>
          <tr className="bg-gray-900">
            <th className="border border-gray-700 p-3">ID</th>
            <th className="border border-gray-700 p-3">Name</th>
            <th className="border border-gray-700 p-3">Position</th>
            <th className="border border-gray-700 p-3">Department</th>
            <th className="border border-gray-700 p-3">Email</th>
            <th className="border border-gray-700 p-3">Salary</th>
            <th className="border border-gray-700 p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="border">
              <td className="text-center border border-gray-700 p-3">{emp.id}</td>
              <td className="text-center border border-gray-700 p-3">{emp.name}</td>
              <td className="text-center border border-gray-700 p-3">{emp.position}</td>
              <td className="text-center border border-gray-700 p-3">{emp.department}</td>
              <td className="text-center border border-gray-700 p-3">{emp.email}</td>
              <td className="text-center border border-gray-700 p-3">{formatToINR(emp.salary)}</td>
              <td className="text-center border border-gray-700 p-3">
                <button onClick={() => handleEdit(emp)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition-all">Edit</button>
                <button onClick={() => handleDelete(emp.id)} className="bg-red-500 text-white px-3 py-1 rounded mr-2 hover:bg-red-600 transition-all">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;