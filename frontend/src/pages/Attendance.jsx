import { useState, useEffect, useContext } from "react";
import API from "../utils/api";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await API.get("/api/employees/");
        setEmployees(response.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);
  
  const fetchAttendanceRecords = async () => {
    try {
      const response = await API.get("/api/attendance/");
      setAttendanceRecords(response.data);
    } catch (err) {
      console.error("Error fetching attendance records:", err);
    }
  };
  
  // Mark attendance
  const handleMarkAttendance = async () => {
    if (!employeeId || !date) {
      setError("Please select an employee and date.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await API.post("/api/attendance/mark", {
        employeeId,
        date,
        status,
        });

      setEmployeeId("");
      setDate("");
      setStatus("Present");
      fetchAttendanceRecords();
      alert("Attendance marked!");
    } catch (err) {
      console.error("Error marking attendance:", err);
      setError("Failed to mark attendance.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-white mb-4">Attendance Management</h2>

      {/* Attendance Form */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Mark Attendance</h3>
        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-3">
          <select
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 mb-3"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="block font-semibold">Date</label>
          <input
            type="date"
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 mb-3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Status</label>
          <select
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 mb-3"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Leave">Leave</option>
          </select>
        </div>

        <button
          onClick={handleMarkAttendance}
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 round"
          disabled={loading}
        >
          {loading ? "Marking..." : "Mark Attendance"}
        </button>
      </div>

      {/* Attendance Records Table */}
      <h3 className="text-lg font-semibold mb-2">Attendance Records</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-700 rounded-lg">
          <thead>
            <tr className="bg-gray-900">
              <th className="p-3 border border-gray-700">Employee Name</th>
              <th className="p-3 border border-gray-700">Date</th>
              <th className="p-3 border border-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.length > 0 ? (
              attendanceRecords.map((record) => (
                <tr key={record.id} className="border">
                  <td className="text-center p-3 border border-gray-700">{record.employeeName}</td>
                  <td className="text-center p-3 border border-gray-700">{record.date}</td>
                  <td
                    className={`text-center p-3 border border-gray-700 ${
                      record.status === "Present"
                        ? "text-green-600"
                        : record.status === "Absent"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {record.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-3 text-center">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;