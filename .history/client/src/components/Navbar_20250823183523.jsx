// src/components/Navbar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ onAuthClick, currentUser, onLogout }) => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            CarRent
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-600 hover:text-primary transition-colors duration-200 ${
                  isActive ? "font-bold text-primary" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/cars" // New Cars link
              className={({ isActive }) =>
                `text-gray-600 hover:text-primary transition-colors duration-200 ${
                  isActive ? "font-bold text-primary" : ""
                }`
              }
            >
              Cars
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-gray-600 hover:text-primary transition-colors duration-200 ${
                  isActive ? "font-bold text-primary" : ""
                }`
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-gray-600 hover:text-primary transition-colors duration-200 ${
                  isActive ? "font-bold text-primary" : ""
                }`
              }
            >
              About
            </NavLink>
          </div>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="relative group">
                <span className="text-gray-600 hover:text-primary transition-colors duration-200 cursor-pointer flex items-center">
                  <FaUserCircle className="mr-2" size={20} />
                  Hi, {currentUser.username}
                </span>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-secondary transition-colors duration-200"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
