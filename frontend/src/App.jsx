import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import './index.css';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute allowedRoles={["admin", "manager", "accountant"]} />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["employee"]} />}>
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Route>

      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default App;