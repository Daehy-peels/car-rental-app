// src/components/AdminNavbar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaCar, FaUsers, FaClipboardList, FaSignOutAlt } from "react-icons/fa";

const AdminNavbar = ({ currentUser, onLogout }) => {
  return (
    <nav className="bg-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/admin" className="text-xl font-bold tracking-wide">
            Admin Dashboard
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/admin/cars"
              className={({ isActive }) =>
                `flex items-center space-x-1 hover:text-primary transition-colors ${
                  isActive ? "text-primary" : ""
                }`
              }
            >
              <FaCar />
              <span>Cars</span>
            </NavLink>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex items-center space-x-1 hover:text-primary transition-colors ${
                  isActive ? "text-primary" : ""
                }`
              }
            >
              <FaUsers />
              <span>Users</span>
            </NavLink>
            <NavLink
              to="/admin/bookings"
              className={({ isActive }) =>
                `flex items-center space-x-1 hover:text-primary transition-colors ${
                  isActive ? "text-primary" : ""
                }`
              }
            >
              <FaClipboardList />
              <span>Bookings</span>
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
