import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";
import Leave from "./Leave";
import Products from "./Inventory";
import Orders from "./Orders";
import PurchaseOrders from "./PurchaseOrders";
import Contacts from "./Contact";

const EmployeeDashboard = () => {
  const { username, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("product");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { key: "product", label: "Inventory" },
    { key: "order", label: "Sale Orders" },
    { key: "purchase-order", label: "Purchase Orders" },
    { key: "leave", label: "Leave Requests" },
    { key: "contact", label: "Contacts" }
  ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-800 border-r border-gray-700 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-300 ease-in-out w-64 z-30 flex flex-col`}
      >
        {/* Sidebar Toggle Button */}
        <div className="px-4 py-4 flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-blue-600 p-1 rounded-md hover:bg-blue-700 transition-all"
          >
            {sidebarOpen ? <X size={12} /> : <Menu size={12} />}
          </button>
        </div>
        
        {/* Admin Panel text centered below button */}
        <h1 className="text-center text-xl font-bold pb-2 border-b border-gray-700">Employee Panel</h1>
        
        <p className="text-center text-sm text-gray-400 mt-3">Welcome, {username}</p>

        <nav className="mt-6 flex-1 px-4 space-y-2 overflow-y-auto">
          {menuItems.map((tab) => (
            <div
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 cursor-pointer rounded-md transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              {tab.label}
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logout}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-md transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Collapsed sidebar toggle button (visible when sidebar is collapsed) - Moved position */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-40 bg-blue-600 p-1 rounded-md hover:bg-blue-700 transition-all"
        >
          <Menu size={12} />
        </button>
      )}

      {/* Main Content Area - Modified spacing to prevent overlap */}
      <div className={`flex-1 p-6 ${sidebarOpen ? "ml-64" : "ml-0"} transition-all duration-300`}>
        {!sidebarOpen && (
          <div>
            <button
              onClick={() => setSidebarOpen(true)}
              className="fixed top-4 left-4 z-40 flex items-center bg-blue-600 p-1 rounded-md hover:bg-blue-700 transition-all"
            >
              <Menu size={12} />
            </button>
            <h2 className="text-3xl font-bold mb-4 mt-2 ml-16">Employee Dashboard</h2>
          </div>
        )}


        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          {activeTab === "product" && <Products />}
          {activeTab === "order" && <Orders />}
          {activeTab === "purchase-order" && <PurchaseOrders />}
          {activeTab === "leave" && <Leave />}
          {activeTab === "contact" && <Contacts />}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;