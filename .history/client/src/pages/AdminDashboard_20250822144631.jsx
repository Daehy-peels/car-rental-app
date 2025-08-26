// src/pages/AdminDashboard.jsx
import React, { useState } from "react";
import UserList from "../components/UserList";
// You can remove or comment out the CarList component
import CarList from "../components/CarList";
// import AddCarForm from "../components/AddCarForm"; // Comment this out if not using

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("cars");

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UserList />;
      case "cars":
        return <CarList />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Admin Dashboard
        </h1>

        {/* Tab Navigation */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("cars")}
            className={`py-3 px-6 rounded-t-lg font-semibold transition-colors ${
              activeTab === "cars"
                ? "bg-white text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Manage Cars
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`py-3 px-6 rounded-t-lg font-semibold transition-colors ${
              activeTab === "users"
                ? "bg-white text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Manage Users
          </button>
          {/* Add more tabs for other features */}
        </div>

        {/* Content based on active tab */}
        <div className="bg-white rounded-b-lg shadow-lg p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
