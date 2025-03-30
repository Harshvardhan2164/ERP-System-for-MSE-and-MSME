import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ForgotPassword = () => {
  const { forgotPass } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPass(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6">
      <div className="bg-gray-850 p-8 rounded-2xl shadow-lg border border-gray-700 w-full max-w-md mx-auto">
        <h2 className="text-3xl font-extrabold mb-6 text-center tracking-wide">Update Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;