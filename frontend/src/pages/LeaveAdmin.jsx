import { useEffect, useState } from "react";
import API from "../utils/api";

const LeaveAdmin = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await API.get("/api/leaves/");
      setLeaveRequests(response.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error.response?.data?.message);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await API.put(
        "/api/leaves/update",
        { id, status });
      fetchLeaveRequests();
    } catch (error) {
      console.error("Error updating leave status:", error.response?.data?.message);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-white mb-4">Leave Management</h2>

      {/* Leave Records Table */}
      <table className="min-w-full border-collapse border border-gray-700 mt-6 text-white">
        <thead>
          <tr className="bg-gray-900">
            <th className="border border-gray-700 p-3">ID</th>
            <th className="border border-gray-700 p-3">Employee Name</th>
            <th className="border border-gray-700 p-3">Start Date</th>
            <th className="border border-gray-700 p-3">End Date</th>
            <th className="border border-gray-700 p-3">Reason</th>
            <th className="border border-gray-700 p-3">Status</th>
            <th className="border border-gray-700 p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((leave) => (
            <tr key={leave.id} className="border">
              <td className="text-center border border-gray-700 p-3">{leave.employeeId}</td>
              <td className="text-center border border-gray-700 p-3">{leave.employeeName}</td>
              <td className="text-center border border-gray-700 p-3">{leave.startDate}</td>
              <td className="text-center border border-gray-700 p-3">{leave.endDate}</td>
              <td className="text-center border border-gray-700 p-3">{leave.reason}</td>
              <td className="text-center border border-gray-700 p-3">{leave.status}</td>
              <td className="text-center border border-gray-700 p-3">
                {leave.status === "pending" && (
                  <>
                    <button onClick={() => handleStatusChange(leave.id, "Approved")} className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600 transition-all">Approve</button>
                    <button onClick={() => handleStatusChange(leave.id, "Rejected")} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all">Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveAdmin;