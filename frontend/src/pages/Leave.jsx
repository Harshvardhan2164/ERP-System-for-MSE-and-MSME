import { useState, useEffect } from "react";
import API from "../utils/api";

const Leave = () => {
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    startDate: "",
    endDate: "",
    reason: "",
    status: "pending",
  });

  useEffect(() => {
    if(formData.employeeId){
      fetchNotifications(formData.employeeId);
    }
  }, [formData.employeeId]);

  const fetchNotifications = async (empId) => {
    try {
      const response = await API.get(`/api/notifications/notify/${empId}`);

      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error.response?.data?.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(
        "/api/leaves/apply",
        { ...formData });
      setFormData((prev) => ( { prev, startDate: "", endDate: "", reason: "" } ));
      alert("Leave request submitted successfully!");
    } catch (error) {
      console.error("Error submitting leave request:", error.response?.data?.message);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-white mb-4">Leave Management</h2>

      {/* Leave Request Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input type="text" name="employeeId" placeholder="Employee ID" value={formData.employeeId} onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })} className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 mb-3" required />
        <label className="block font-semibold">Start Date</label>
        <input type="date" name="startDate" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 mb-3" required />
        <label className="block font-semibold">End Date</label>
        <input type="date" name="endDate" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 mb-3" required />
        <input type="text" name="reason" placeholder="Reason" value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 mb-3" required />
        <button type="submit" className="bg-green-500 text-white hover:bg-green-600 rounded w-full px-4 py-2">Apply Leave</button>
      </form>

      <button
      onClick={() => fetchNotifications(formData.employeeId)}
      className="bg-blue-500 text-white rounded hover:bg-blue-600 px-4 py-2 mb-4"
      >
        Notifications
      </button>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Notifications</h3>
        {notifications.length === 0 ? (
          <p className="text-red-500">No notifications available</p>
        ) : (
          <ul className="list-disc pl-5">
            {notifications.map((notification) => (
              <li key={notification.id} className="text-white">
                {notification.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Leave;