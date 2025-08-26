// src/pages/AdminDashboard.jsx
import React, { useState } from "react";
import AddCarForm from "../components/AddCarForm";
import ManageCars from "../components/ManageCars";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("addCar");

  const renderContent = () => {
    switch (activeTab) {
      case "addCar":
        return <AddCarForm />;
      case "manageCars":
        return <ManageCars />;
      // You will add 'manageUsers' and 'manageBookings' here later
      default:
        return <AddCarForm />;
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-text mb-8 text-center">
          Admin Dashboard
        </h1>

        {/* Tab Navigation */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("addCar")}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              activeTab === "addCar"
                ? "bg-primary text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Add Car
          </button>
          <button
            onClick={() => setActiveTab("manageCars")}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              activeTab === "manageCars"
                ? "bg-primary text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Manage Cars
          </button>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
          {renderContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
