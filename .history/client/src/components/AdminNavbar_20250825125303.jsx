// src/components/AdminNavbar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaCar,
  FaUsers,
  FaClipboardList,
  FaSignOutAlt,
  FaPlus,
  FaChartBar,
} from "react-icons/fa";

const AdminNavbar = ({ currentUser, onLogout }) => {
  return (
    <nav className="bg-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link
            to="/admin"
            className="text-xl font-bold tracking-wide hover:text-primary transition-colors"
          >
            Admin Dashboard
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/admin/cars"
              className={({ isActive }) =>
                `flex items-center space-x-1 py-1 px-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-gray-700 text-primary"
                    : "text-white hover:bg-gray-700"
                }`
              }
            >
              <FaCar />
              <span>Cars</span>
            </NavLink>
            <NavLink
              to="/admin/add-car"
              className={({ isActive }) =>
                `flex items-center space-x-1 py-1 px-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-gray-700 text-primary"
                    : "text-white hover:bg-gray-700"
                }`
              }
            >
              <FaPlus />
              <span>Add Car</span>
            </NavLink>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex items-center space-x-1 py-1 px-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-gray-700 text-primary"
                    : "text-white hover:bg-gray-700"
                }`
              }
            >
              <FaUsers />
              <span>Users</span>
            </NavLink>
            <NavLink
              to="/admin/bookings"
              className={({ isActive }) =>
                `flex items-center space-x-1 py-1 px-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-gray-700 text-primary"
                    : "text-white hover:bg-gray-700"
                }`
              }
            >
              <FaClipboardList />
              <span>Bookings</span>
            </NavLink>
            <NavLink
              to="/admin/reports" // New NavLink for reports
              className={({ isActive }) =>
                `flex items-center space-x-1 py-1 px-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-gray-700 text-primary"
                    : "text-white hover:bg-gray-700"
                }`
              }
            >
              <FaChartBar />
              <span>Reports</span>
            </NavLink>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-300">
            {currentUser?.username}
          </span>
          <button
            onClick={onLogout}
            className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md transition-colors"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
