import { useEffect, useState } from "react";
import API from "../utils/api";

const RegisterUser = () => {
    const [userData, setUserData] = useState({ name: "", email: "", password: "", role: "employee" });
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
      fetchUsers();
    }, []);

    const fetchUsers = async () => {
      try{
        const response = await API.get("/api/users/");
        setUsers(response.data); 
      } catch (error){
        console.error("Error fetching users: ", error.response?.data?.message);
      }
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };
    
    const registerUser = async () => {
      try {
        await API.post("/api/auth/register", userData);
        setShowForm(false);
        setEditingUser(null);
        fetchUsers();
        alert("User registered successfully!");
      } catch (error) {
        console.error("Error registering user:", error.response?.data?.message);
      }
    };

    const editRole = async (id, newRole) =>{
      try{
        await API.put("/api/users/update-role", { id, role:newRole });
        fetchUsers();
        alert("User role updated successfully!");
      }catch(error){
        console.error("Error updating the user role: ", error.response?.data?.message);
      }
    };

    const deleteUser = async (id) => {
      if(!window.confirm("Are you sure want to delete this user?")) return;
      try{
        await API.delete(`/api/users/delete/${id}`);
        fetchUsers();
        alert("User deleted successfully!");
      } catch(error){
        console.error("Error deleting user: ", error.response?.data?.message);
      }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-white mb-4">Register User</h2>

          <button
            onClick={() => {
              setEditingUser(null);
              setUserData({
                name: "",
                email: "",
                password: "",
                role: "employee",
              });
              setShowForm(true);
            }}
            className="w-full p-3 bg-green-500 px-4 py-2 rounded-md text-white font-semibold hover:bg-green-600 transition-all"
          >
            Register New User
          </button>

          {showForm && (
            <div className="mt-4 p-4 border border-gray-500">
              <h3 className="text-xl font-semibold text-white">Register New User</h3>

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={userData.name}
                onChange={handleChange}
                className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleChange}
                className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={userData.password}
                onChange={handleChange}
                className="w-full mt-5 p-3 rounded bg-gray-700 text-white border border-gray-600"
              />
              <select
                name="role"
                value={userData.role}
                onChange={handleChange}
                className="w-full mt-5 p-3 mb-4 rounded bg-gray-700 text-white border border-gray-600"
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>

              <button onClick={registerUser} className="w-full bg-blue-500 px-4 py-2 mt-4 rounded-md text-white font-semibold hover:bg-blue-600 transition-all">
                Register
              </button>

              <button onClick={() => setShowForm(false)} className="bg-red-500 text-white w-full px-4 py-2 mt-3 rounded font-semibold hover:bg-red-600 transition-all">
                Close
              </button>
            </div>
          )}

          <table className="min-w-full border-collapse border border-gray-700 mt-6 text-white">
            <thead>
              <tr className="bg-gray-900">
                <th className="border border-gray-700 p-3">ID</th>
                <th className="border border-gray-700 p-3">Name</th>
                <th className="border border-gray-700 p-3">Email</th>
                <th className="border border-gray-700 p-3">Role</th>
                <th className="border border-gray-700 p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border border-gray-700 bg-gray-800">
                  <td className="p-3 text-center border border-gray-700">{user.id}</td>
                  <td className="p-3 text-center border border-gray-700">{user.name}</td>
                  <td className="p-3 text-center border border-gray-700">{user.email}</td>
                  <td className="p-3 text-center border border-gray-700">
                  {editingUser === user.id ? (
                      <select
                        value={user.role}
                        onChange={(e) => editRole(user.id, e.target.value)}
                        className="p-2 rounded bg-gray-700 text-white border border-gray-600"
                      >
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td className="p-3 text-center">
                    <button 
                      onClick={() => setEditingUser(editingUser === user.id ? null : user.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition-all"
                    >
                      {editingUser === user.id ? "Save" : "Edit"}
                    </button>
                    <button 
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    );
};

export default RegisterUser;