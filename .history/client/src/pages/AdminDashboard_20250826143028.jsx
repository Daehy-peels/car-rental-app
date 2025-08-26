// src/pages/AdminDashboard.jsx
import React, { useState } from "react";
import CarList from "../components/CarList";
import UserList from "../components/UserList";
import BookingList from "../components/BookingList";
import AddCarForm from "../components/AddCarForm";
import FinancialDashboard from "./FinancialDashboard";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("cars");

  const renderContent = () => {
    switch (activeTab) {
      case "cars":
        return <CarList />;
      case "add-car":
        return <AddCarForm />;
      case "users":
        return <UserList />;
      case "bookings":
        return <BookingList />;
      case "reports":
        return <FinancialDashboard />;
      default:
        return <CarList />;
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">
        Admin Dashboard
      </h1>
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("cars")}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
            activeTab === "cars"
              ? "bg-primary text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Manage Cars
        </button>
        <button
          onClick={() => setActiveTab("add-car")}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
            activeTab === "add-car"
              ? "bg-primary text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Add New Car
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
            activeTab === "users"
              ? "bg-primary text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Manage Users
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
            activeTab === "bookings"
              ? "bg-primary text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Manage Bookings
        </button>
        <button
          onClick={() => setActiveTab("reports")}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
            activeTab === "reports"
              ? "bg-primary text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Financial Reports
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
