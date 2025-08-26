// src/pages/AdminDashboard.jsx
import React from "react";
import AddCarForm from "../components/AddCarForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-text mb-8 text-center">
          Admin Dashboard
        </h1>
        <div className="max-w-xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
            Add a New Car
          </h2>
          <AddCarForm />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
