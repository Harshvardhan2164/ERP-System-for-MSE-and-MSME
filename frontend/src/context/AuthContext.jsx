import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import API from "../utils/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState(localStorage.getItem("username") || "User");

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded User:", decoded);
        setUser(decoded);
      } catch (error) {
        logout();
      }
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await API.post("/api/auth/login", {
        email,
        password,
      });

      const userToken = response.data.token;
      localStorage.setItem("token", userToken);
      setToken(userToken);

      const decodedUser = jwtDecode(userToken);
      setUser(decodedUser);

      if (decodedUser.role === "admin" || decodedUser.role === "manager" || decodedUser.role === "accountant") {
        navigate("/admin-dashboard");
      } else {
        navigate("/employee-dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message);
      alert(error.response?.data?.message || "Login failed. Please try again.")
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken("");
    setUser(null);
    setUsername("");
    navigate("/login");
  };

  const forgotPass = async (email, password) => {
    try{
      await API.post("/api/auth/forgot", {
        email,
        password,
      });
      alert("Password updated successfully");
      navigate("/login");
    } catch (error){
      console.error("Password update failed: ", error.response?.data?.message);
      alert("Password update failed.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, username, setUsername, forgotPass }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;