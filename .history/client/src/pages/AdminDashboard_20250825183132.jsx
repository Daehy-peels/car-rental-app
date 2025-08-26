// src/pages/AdminDashboard.jsx
import React from "react";
import { Outlet } from "react-router-dom"; 

const AdminDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Admin Dashboard
        </h1>

        {/* Content will be rendered here based on the URL */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
